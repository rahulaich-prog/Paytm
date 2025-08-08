import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { Header } from "../components/Header";

export const Dashboard = () => {
    return (
        <div>
            <Header />
            <div className="m-8">
                <Balance />
                <Users />
            </div>
        </div>
    );
};