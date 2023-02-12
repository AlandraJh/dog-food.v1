import s from './index.module.css';
import cn from 'classnames';
import { useState } from 'react';


function Header({user, onUpdateUser, children}) {

  const [name, setName] = useState(user.name);
  const [about, setAbout] = useState(user.about);

  const handleClickButtonEdit = (e) => {
		e.preventDefault();
		onUpdateUser({name: name, about: about})
	}

  return (
    <header className={cn(s.header,'cover')}>
      <div className="container">
        <div className={s.wrapper}>
          {children}
        </div>
      </div>
      <div className={s.profile}>
		{user.email && <span>{user.email}</span>}
		{user.name && <span>{user.name}: {user.about}</span>}
		</div>
      <button onClick={handleClickButtonEdit} className="btn btn_type_secondary">
        Изменить
      </button>
    </header>
  )
}

export default Header;
