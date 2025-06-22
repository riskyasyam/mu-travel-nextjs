'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

// Komponen ini akan menerima 'id' dan 'action' sebagai props
export function DeleteConfirmation({ id, action, children }) {
  // Bind ID ke server action
  const deleteActionWithId = action.bind(null, id);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* Tombol yang akan memicu dialog, diberi style destructive */}
        <Button variant="destructive" size="sm">{children}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah Anda Benar-benar Yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak bisa dibatalkan. Ini akan menghapus data testimoni secara permanen dari server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          {/* Form hanya membungkus tombol Hapus */}
          <form action={deleteActionWithId}>
            <AlertDialogAction type="submit">Hapus</AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}