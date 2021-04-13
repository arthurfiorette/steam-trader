import { InfoBoxColumn } from '../components/infoBox';
import Logs from '../components/logs';
import Accounts from '../components/accounts';
import Trades from '../components/trades';

export default function App() {
  return (
    <div className="container-lg mb-3">
      <div className="row">
        <InfoBoxColumn size="xl-7 col-xxl-8" title="Trades" Children={Trades} />
        <InfoBoxColumn
          size="md-6 col-xl-5 col-xxl-4"
          title="Accounts"
          Children={Accounts}
        />
        <InfoBoxColumn size="md-6 col-xl-12" title="Logs" Children={Logs} />
      </div>
    </div>
  );
}