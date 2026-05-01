export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="mt-8 flex max-w-480 flex-col items-center gap-2 border-t border-zinc-200 bg-white px-4 py-6 text-sm text-zinc-500 sm:flex-row sm:justify-between sm:px-6 md:px-8 xl:px-21"
      role="contentinfo"
    >
      <p className="text-center sm:text-left">
        © <span aria-label={`Ano atual ${currentYear}`}>{currentYear}</span> Sneakers Store.
      </p>

      <p className="text-center sm:text-right">
        Desenvolvido por <span aria-label="Nome do desenvolvedor">Bruno Tenório</span>
      </p>
    </footer>
  );
}
