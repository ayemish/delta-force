import PageHeader from "@/components/shared/page-header";
import Card from "@/components/shared/card";
import InspectionCalendar from "@/components/shared/inspection-calendar";

export default function AdminInspectionsPage() {
  return (
    <div className="p-6 lg:p-8 lg:pb-12">
      <PageHeader
        title="Inspections"
        subtitle="Trade-specific cadence per building risk profile"
      />
      <Card>
        <InspectionCalendar role="admin" />
      </Card>
    </div>
  );
}
