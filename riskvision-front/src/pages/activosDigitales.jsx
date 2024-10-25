import React, { useMemo, useState, useEffect } from 'react';
import Papa from 'papaparse'; // Librería para parsear CSV
import { useTable, useResizeColumns, useFlexLayout } from 'react-table';
import backgroundImage from '../page-background.jpg';
import BurgerMenu from './BurgerMenu';

const ActivosDigitales = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const loadCSV = async (filePath) => {
    const response = await fetch(filePath);
    const text = await response.text();
    Papa.parse(text, {
      complete: (result) => {
        const keys = result.data.length > 0 ? Object.keys(result.data[0]) : [];
        const columnStructure = keys.map((key) => ({
          Header: key,
          accessor: key,
          Cell: EditableCell, // Hacemos las celdas editables
        }));
        setColumns(columnStructure);
        setData(result.data);
      },
      header: true,
    });
  };

  useEffect(() => {
    loadCSV('/data/IAD.csv');
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      complete: (result) => {
        const keys = result.data.length > 0 ? Object.keys(result.data[0]) : [];
        const columnStructure = keys.map((key) => ({
          Header: key,
          accessor: key,
          Cell: EditableCell, // Hacemos las celdas editables
        }));
        setColumns(columnStructure);
        setData(result.data);
      },
      header: true,
    });
  };

  // Función para manejar los cambios en las celdas
  const updateMyData = (rowIndex, columnId, value) => {
    setData((oldData) =>
      oldData.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  // Definir un componente EditableCell
  const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // Esta función se pasa para actualizar los datos
  }) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (e) => {
      setValue(e.target.value);
    };

    const onBlur = () => {
      updateMyData(index, id, value); // Actualizar datos al perder el foco
    };

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return <input value={value || ''} onChange={onChange} onBlur={onBlur} className="w-full px-2 py-1 border" />;
  };

  const defaultColumn = useMemo(
    () => ({
      minWidth: 100,
      width: 150,
      maxWidth: 400,
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
        updateMyData, // Pasamos la función para actualizar los datos
      },
      useFlexLayout, // Esto asegura que las columnas sean flexibles
      useResizeColumns // Este plugin permite que las columnas sean redimensionables
    );

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="min-h-screen bg-[#201E43] flex flex-col justify-between"
    >
      <BurgerMenu />
      <div className="text-center mt-8">
        <h1 className="inline-block text-4xl font-bold text-white bg-[#508C9B] p-4 rounded-md">
          Activos Digitales
        </h1>
      </div>

      <div className="overflow-x-auto mt-8 mx-10">
        <div className="overflow-y-auto h-[72vh]">
          {data.length > 0 ? (
            <table
              {...getTableProps()}
              className="table-auto w-full border border-gray-300 text-black bg-white rounded-md shadow-md"
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()} className="bg-[#508C9B] text-white">
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(column.getResizerProps())}
                        className="relative px-4 py-2 border text-left"
                      >
                        {column.render('Header')}
                        <div
                          {...column.getResizerProps()}
                          className="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize"
                        />
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className="even:bg-gray-200">
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()} className="px-4 py-2 border">
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-600">No hay archivo cargado.</p>
          )}
        </div>
      </div>

      <div className="flex justify-center my-8">
        <label
          htmlFor="csvInput"
          className="bg-[#134B70] text-white py-2 px-4 rounded-md cursor-pointer hover:bg-[#508C9B]"
        >
          Cambiar de archivo
        </label>
        <input
          id="csvInput"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ActivosDigitales;


