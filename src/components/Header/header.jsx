import s from './index.module.css';
import cn from 'classnames';


function Header({children, user}) {

  return (
    <header className={cn(s.header,'cover')}>
      <div className="container">
        <div className={s.wrapper}>
          {children}
        </div>
        <div>Имя пользователя: {user?.name}</div>
         <div> Email: {user?.email}</div>
         <div> О себе: {user?.about}</div>
      </div>
    </header>
  )
}

export default Header;
