'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,      // <-- Pastikan ini di-impor
  AlertDialogTitle,       // <-- Pastikan ini di-impor
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function DeleteConfirmation({ id, action, children }) {
  // Bind ID ke server action
  const deleteActionWithId = action.bind(null, id);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">{children}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        
        {/* Pastikan blok header ini ada */}
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah Anda Benar-benar Yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak bisa dibatalkan. Data akan dihapus secara permanen dari server.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <form action={deleteActionWithId}>
            <AlertDialogAction type="submit">Ya, Hapus</AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}