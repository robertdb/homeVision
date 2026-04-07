import * as React from "react";
import { Dialog } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function DialogRoot({ ...props }: Dialog.Root.Props) {
  return <Dialog.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: Dialog.Trigger.Props) {
  return <Dialog.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: Dialog.Portal.Props) {
  return <Dialog.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ className, ...props }: Dialog.Close.Props) {
  return (
    <Dialog.Close
      data-slot="dialog-close"
      className={cn(buttonVariants({ variant: "ghost", size: "icon" }), className)}
      {...props}
    />
  );
}

function DialogOverlay({ className, ...props }: Dialog.Backdrop.Props) {
  return (
    <Dialog.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 z-50 bg-black/50 duration-200",
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: Dialog.Popup.Props & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <Dialog.Viewport className="fixed inset-0 z-50 grid place-items-center p-4">
        <Dialog.Popup
          data-slot="dialog-content"
          className={cn(
            "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:fade-in-0 data-open:zoom-in-95 relative z-50 grid w-full max-w-lg gap-4 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-lg ring-1 ring-foreground/10 duration-200",
            className,
          )}
          {...props}
        >
          {children}
          {showCloseButton ? (
            <DialogClose
              type="button"
              aria-label="Close"
              className="absolute end-3 top-3 rounded-lg opacity-70 hover:opacity-100"
            >
              <XIcon className="size-4" />
            </DialogClose>
          ) : null}
        </Dialog.Popup>
      </Dialog.Viewport>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-1.5 text-center sm:text-start", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: Dialog.Title.Props) {
  return (
    <Dialog.Title
      data-slot="dialog-title"
      className={cn("font-heading text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: Dialog.Description.Props) {
  return (
    <Dialog.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  DialogRoot as Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
