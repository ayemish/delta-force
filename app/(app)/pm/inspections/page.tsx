import PageHeader from "@/components/shared/page-header";
import Card from "@/components/shared/card";
import InspectionCalendar from "@/components/inspections/inspection-calendar";

export default function PMInspectionsPage() {
  return (
    <div className="p-6 lg:p-8 lg:pb-12">
      <PageHeader
        title="Inspections"
        subtitle="Inspection schedule for your buildings"
      />
      <Card>
        <InspectionCalendar role="pm" />
      </Card>
    </div>
  );
}
