import { Github } from 'react-bootstrap-icons';
import { IconButton } from './components/button';
import { GIT_URL } from './constants';

export default function Header() {
  return (
    <header id="header" className="shadow">
      <nav className="navbar navbar-expand navbar-dark bg-dark px-4 justify-content-between">
        <div className="navbar-brand">Steam Trader</div>
        <a href={GIT_URL} target="_blank">
          <IconButton icon={Github} color="light" classes="border-0 p-1" iconProps={{ size: '32' }} />
        </a>
      </nav>
    </header>
  );
}
