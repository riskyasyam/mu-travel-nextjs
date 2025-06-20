import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Placeholder untuk Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Credits Usage Last Year</CardTitle>
          <CardDescription>149,758</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-gray-200 rounded-md flex items-center justify-center">
            <p className="text-gray-500">[Placeholder untuk Grafik Chart]</p>
          </div>
        </CardContent>
      </Card>

      {/* Placeholder untuk Tabel */}
      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-200 rounded-md flex items-center justify-center">
            <p className="text-gray-500">[Placeholder untuk Tabel Pengguna]</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};