type DropdownOption = {
  value: string;
  label: string;
};

export type DropdownProps = {
  icon: React.ReactNode;
  value: string;
  placeholder: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
};
