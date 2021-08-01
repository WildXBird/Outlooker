import { GlobalDataManager } from "./GlobalDataManager"
import Interface from "./interface"

export default function App(props) {
    return (
        <>
            <GlobalDataManager />
            <Interface props={props} />
        </>
    );
}
