import { useContext, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Button, Input } from "semantic-ui-react";
import { TransfersContext } from "../../context/TransfersContext";
import { Transfer } from "../../models/transfer";
import ModalTransfer from "../Modal/Transfer";

const TransferTable = () => {
  const {transfers} = useContext(TransfersContext);
  const [dataApi, setDataApi] = useState<Transfer[]>([]);
  const [dataSearch, setDataSearch] = useState<Transfer[]>([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setDataApi(transfers);
  }, [transfers]);

  useEffect(() => {
    const dataSearchMask = dataApi;
    dataApi.map((value, key) => {
      let transferCompletionNew = maskDate(
        value.transferCompletionDate.split("-")
      );
      let schedulingDateNew = maskDate(value.schedulingDate.split("-"));

      dataSearchMask[key].transferCompletionDate = transferCompletionNew;
      dataSearchMask[key].schedulingDate = schedulingDateNew;
    });
    setDataSearch(dataSearchMask);

    const taxFixedMask = dataApi;
    dataApi.map((value, key) => {
      let taxNew = value.tax?.toFixed(3);
      taxFixedMask[key].tax = taxNew;
    });
    setDataSearch(taxFixedMask);
  }, [dataApi]);

  useEffect(() => {
    if (search != "") {
      var filter = dataApi.filter(function (obj) {
        if (
          search.toLowerCase() == obj.id?.toString().toLowerCase() ||
          search.toLowerCase() == obj.originAccount.toString().toLowerCase() ||
          search.toLowerCase() ==
            obj.destinationAccount.toString().toLowerCase() ||
          search.toLowerCase() == obj.transferValue.toString().toLowerCase() ||
          search.toLowerCase() == obj.tax?.toString().toLowerCase() ||
          search.toLowerCase() ==
            obj.transferCompletionDate.toString().toLowerCase() ||
          search.toLowerCase() == obj.schedulingDate.toString().toLowerCase()
        ) {
          return true;
        }
      });
      setDataSearch(filter);
    } else {
      setDataSearch(transfers);
    }
  }, [search]);

  const maskDate = (date_string: string[]): string => {
    let date_string_year = date_string[0];
    let date_string_month = date_string[1];
    let date_string_day = date_string[2];
    let new_date =
      date_string_day + "/" + date_string_month + "/" + date_string_year;
    return new_date;
  };

  const columns: TableColumn<Transfer>[] = [
    {
      name: "#",
      selector: (row) => row.id,
      sortable: true,
      reorder: true,
    },
    {
      name: "Conta de Origem",
      selector: (row) => row.originAccount,
      sortable: false,
      reorder: true,
    },
    {
      name: "Conta de Destino",
      selector: (row) => row.destinationAccount,
      sortable: false,
      reorder: true,
    },
    {
      name: "Valor da Transferência",
      selector: (row) => row.transferValue,
      sortable: true,
      reorder: true,
    },
    {
      name: "Taxa",
      selector: (row) => row.tax,
      sortable: true,
      reorder: true,
    },
    {
      name: "Data de Transferência",
      selector: (row) => row.transferCompletionDate,
      sortable: false,
      reorder: true,
    },
    {
      name: "Data de Agendamento",
      selector: (row) => row.schedulingDate,
      sortable: false,
      reorder: true,
    },
  ];

  const openModal = () => {
    setModal(true);
    setTimeout(() => {
      setModal(false);
    }, 10);
  };

  return (
    <>
      <DataTable
        title="Lista de Transferências"
        columns={columns}
        data={dataSearch}
        pagination
        striped
        highlightOnHover
        responsive
        fixedHeaderScrollHeight="300px"
        subHeader
        subHeaderComponent={
          <div className="flex w-full flex-wrap gap-5">
            <Input
              icon="search"
              placeholder="Buscar..."
              className="flex-1"
              onChange={(t) => setSearch(t.target.value)}
            />
            <Button
              color="black"
              content="Nova Transferência"
              icon="plus"
              onClick={openModal}
            />
          </div>
        }
        subHeaderWrap
      />
      <ModalTransfer show={modal} />
    </>
  );
};

export default TransferTable;
