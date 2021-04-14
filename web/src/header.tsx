import { Icon } from 'react-bootstrap-icons';
import { Github, QuestionSquare } from 'react-bootstrap-icons';
import { ColoredIconButton } from './components/button';
import { GIT_URL, PAGE_URL } from './constants';

export const Header = (({}) => {
  return (
    <header id="header" className="shadow">
      <nav className="navbar navbar-expand navbar-dark bg-dark px-4 justify-content-between">
        <div className="navbar-brand fs-4">Steam Trader</div>
        <div>
          <HeaderIconUrl href={PAGE_URL} icon={QuestionSquare} />
          <HeaderIconUrl href={GIT_URL} icon={Github} />
        </div>
      </nav>
    </header>
  );
}) as React.FC<{}>;

export const HeaderIconUrl = (({ href, icon }) => {
  return (
    <a href={href} target="_blank">
      <ColoredIconButton
        icon={icon}
        color="light"
        classes="border-0 p-1"
        iconProps={{ size: '32' }}
      />
    </a>
  );
}) as React.FC<{ icon: Icon; href: string }>;
