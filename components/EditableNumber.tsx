"use client";

import { useEffect, useState } from "react";

/**
 * Renders a number as text for viewers, or an editable input for admins.
 * Commits onBlur / Enter. Used for inline editing of Convex-backed values.
 */
export function EditableNumber({
  value,
  canEdit,
  onCommit,
  format = (n) => String(n),
  step = 1,
  prefix = "",
  suffix = "",
}: {
  value: number;
  canEdit: boolean;
  onCommit: (next: number) => void | Promise<unknown>;
  format?: (n: number) => string;
  step?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [draft, setDraft] = useState(String(value));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  if (!canEdit) {
    return (
      <span>
        {prefix}
        {format(value)}
        {suffix}
      </span>
    );
  }

  const commit = async () => {
    const next = Number(draft);
    if (Number.isNaN(next) || next === value) {
      setDraft(String(value));
      return;
    }
    setSaving(true);
    try {
      await onCommit(next);
    } finally {
      setSaving(false);
    }
  };

  return (
    <input
      className="cell-input"
      type="number"
      step={step}
      value={draft}
      disabled={saving}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") (e.target as HTMLInputElement).blur();
        if (e.key === "Escape") setDraft(String(value));
      }}
    />
  );
}
