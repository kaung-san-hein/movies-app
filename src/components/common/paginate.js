import _ from "lodash";
export function Paginate(data, currentPage, pageSize) {
  const start = currentPage * pageSize - pageSize;
  return _(data)
    .slice(start)
    .take(pageSize)
    .value();
}
