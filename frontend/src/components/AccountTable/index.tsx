import { useContext, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Button, Input } from "semantic-ui-react";
import { AccountsContext } from "../../context/AccountsContext";
import transfersAPI from "../../helpers/transferRequest";
import { Account } from "../../models/account";
import ModalAccount from "../Modal/Account";

const AccountTable = () => {
  const api = transfersAPI();

  const { accounts } = useContext(AccountsContext);
  const [dataApi, setDataApi] = useState<Account[]>([]);
  const [dataSearch, setDataSearch] = useState<Account[]>([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setDataApi(accounts);
  }, [accounts]);

  useEffect(() => {
    if (search != "") {
      var filter = dataApi.filter(function (obj) {
        if (
          search.toLowerCase() == obj.id?.toString().toLowerCase() ||
          search.toLowerCase() == obj.number?.toString().toLowerCase()
        ) {
          return true;
        }
      });
      setDataSearch(filter);
    } else {
      setDataSearch(accounts);
    }
  }, [search, accounts]);

  const columns: TableColumn<Account>[] = [
    {
      name: "#",
      selector: (row) => row.id,
      sortable: true,
      reorder: true,
    },
    {
      name: "Número da conta",
      selector: (row) => row.number,
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
        title="Lista de Contas"
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
              content="Criar Conta"
              icon="plus"
              onClick={openModal}
            />
          </div>
        }
        subHeaderWrap
      />
      <ModalAccount show={modal} />
    </>
  );
};

export default AccountTable;
