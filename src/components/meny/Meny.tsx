import { System } from "@navikt/ds-icons";
import { Dropdown, Header } from "@navikt/ds-react-internal";
import { Link } from "react-router-dom";
import useStore, { selectSetIsLoggedIn } from "../../store/store";

const Meny = () => {
  const setIsLoggedIn = useStore(selectSetIsLoggedIn);
  const clickedLogoutHandler = () => setIsLoggedIn(false);
  return (
    <Header>
      <Header.Title as={Link} to={"/"}>
        Økonomiportalen
      </Header.Title>
      <Dropdown>
        <Header.Button as={Dropdown.Toggle} className="ml-auto">
          <System style={{ fontSize: "1.5rem" }} title="Systemer og oppslagsverk" />
        </Header.Button>

        <Dropdown.Menu>
          <Dropdown.Menu.GroupedList>
            <Dropdown.Menu.GroupedList.Heading>Systemer og oppslagsverk</Dropdown.Menu.GroupedList.Heading>
            <Dropdown.Menu.GroupedList.Item as={Link} to={"/attestasjon"}>
              Attestasjon
            </Dropdown.Menu.GroupedList.Item>
          </Dropdown.Menu.GroupedList>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Header.UserButton as={Dropdown.Toggle} name="Ola Normann" description="Enhet: Skien" />
        <Dropdown.Menu>
          <Dropdown.Menu.List>
            <Dropdown.Menu.List.Item onClick={clickedLogoutHandler}>Logg ut</Dropdown.Menu.List.Item>
          </Dropdown.Menu.List>
        </Dropdown.Menu>
      </Dropdown>
    </Header>
  );
};

export default Meny;
