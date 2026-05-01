export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
};
