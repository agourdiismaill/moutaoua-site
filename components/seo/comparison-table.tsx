type ComparisonRow = {
  criteria: string;
  left: string;
  right: string;
};

type ComparisonColumns = {
  criteria: string;
  left: string;
  right: string;
};

type Props = {
  columns: ComparisonColumns;
  rows: ComparisonRow[];
  verdictLabel: string;
  verdict: string;
};

export function ComparisonTable({ columns, rows, verdictLabel, verdict }: Props) {
  return (
    <>
      <div className="container-max overflow-x-auto rounded-3xl border border-border bg-card shadow-soft">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-bright">
              <th className="p-4 font-semibold">{columns.criteria}</th>
              <th className="p-4 font-semibold">{columns.left}</th>
              <th className="p-4 font-semibold">{columns.right}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.criteria} className="border-b border-border last:border-0">
                <td className="p-4 font-medium">{row.criteria}</td>
                <td className="p-4 text-muted-foreground">{row.left}</td>
                <td className="p-4 text-muted-foreground">{row.right}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="container-max mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-foreground">
        <strong>{verdictLabel}</strong> {verdict}
      </p>
    </>
  );
}
