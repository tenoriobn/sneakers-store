import { useEffect, useRef, useState } from 'react';
import Arrow from 'public/icons/arrow.svg?react';
import Check from 'public/icons/check.svg?react';
import type { DropdownProps } from './dropdown.type';

export default function Dropdown({ icon, value, placeholder, options, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLabel = options.find((o) => o.value === value)?.label || placeholder;

  const select = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-12 w-full items-center justify-between rounded-xl border bg-white px-4 shadow-sm transition-all ${
          isOpen
            ? 'border-orange-400 ring-4 ring-orange-400/10'
            : 'border-zinc-200 hover:border-zinc-300'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className={isOpen ? 'text-orange-400' : 'text-zinc-400'}>{icon}</span>
          <span className="truncate text-zinc-700">{currentLabel}</span>
        </div>
        <Arrow
          className={`text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="animate-in fade-in zoom-in absolute z-50 mt-2 w-full rounded-xl border border-zinc-100 bg-white py-2 shadow-xl duration-200">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => select(opt.value)}
              className="group flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-zinc-50"
            >
              <span
                className={value === opt.value ? 'font-medium text-orange-500' : 'text-zinc-600'}
              >
                {opt.label}
              </span>
              {value === opt.value && <Check className="text-orange-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
