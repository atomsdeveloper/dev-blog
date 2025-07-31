type DialogProps = {
  wasOpened?: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
  disabled: boolean;
};

export function Dialog({
  wasOpened = false,
  title,
  content,
  onConfirm,
  onCancel,
  disabled = false,
}: DialogProps) {
  if (!wasOpened) {
    return null;
  }

  function handleClose() {
    if (disabled) return;
    onCancel();
  }

  return (
    <section className="fixed z-50 inset-0 bg-black/60 backdrop:backdrop-blur-xs flex items-center justify-center">
      <div
        className="bg-slate-50 p-6 rounded-lg max-w-2xl mx-6 flex flex-col gap-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-content"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing the dialog
      >
        <h3 className="text-xl font-extrabold" id="dialog-title">
          {title}
        </h3>
        <div id="dialog-content">{content}</div>
        <div className="flex items-center justify-around">
          <button
            disabled={disabled}
            onClick={handleClose}
            type="button"
            aria-label="Cancelar"
            title="Cancelar"
            autoFocus
            className="bg-slate-200 hover:bg-slate-300 transition text-slate-950 flex items-center justify-center py-2 px 4 rounded-lg cursor-pointer border-none disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            disabled={disabled}
            onClick={onConfirm}
            type="button"
            aria-label="Confirmar"
            title="Confirmar"
            className="bg-green-200 hover:bg-green-300 transition text-slate-50 flex items-center justify-center py-2 px 4 rounded-lg cursor-pointer border-none disabled:bg-slate-200 disabled::text-slate-400 disabled:cursor-not-allowed"
          >
            Ok
          </button>
        </div>
      </div>
    </section>
  );
}
