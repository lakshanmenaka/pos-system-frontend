interface SkeletonTableProps {
  rows?: number;
  columns?: number;
}

const SkeletonTable = ({
  rows = 6,
  columns = 5,
}: SkeletonTableProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
      <div className="animate-pulse">
        <div className="grid grid-cols-5 gap-4 border-b border-gray-100 px-5 py-4">
          {Array.from({ length: columns }).map((_, index) => (
            <div
              key={index}
              className="h-3 rounded bg-gray-200"
            />
          ))}
        </div>

        {Array.from({ length: rows }).map((_, row) => (
          <div
            key={row}
            className="grid grid-cols-5 gap-4 border-b border-gray-50 px-5 py-4 last:border-0"
          >
            {Array.from({ length: columns }).map((_, column) => (
              <div
                key={column}
                className="h-4 rounded bg-gray-100"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonTable;