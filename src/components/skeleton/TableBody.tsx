interface Props {
  rowCount?: number;
  colCount?: number;
}
export default function TableBody({
  rowCount = 10,
  colCount = 5,
}: Props) {
  return (
    <>
      {new Array(rowCount).fill(1).map((item, index) => {
        return (
          <tr key={index}>
            {new Array(colCount).fill(1).map((item, indx) => {
              return (
                <td key={index}>
                  <div className="os-td-skeleton skeleton"></div>
                </td>
              );
            })}
          </tr>
        );
      })}
    </>
  );
}
