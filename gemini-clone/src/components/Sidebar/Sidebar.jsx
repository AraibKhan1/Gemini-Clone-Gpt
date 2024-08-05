import React, { useState, useContext, useEffect } from 'react'; // Added useContext to the import
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  // Fixed typo and corrected variable name
  const { onSent, prevPrompt, setRecentPrompt } = useContext(Context);

  return (
    <div className='sidebar'>
      <div className="top">
        <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt="" />
        <div className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended
          ?
          <div className="recent">
            <p className='recent-title'>Recent</p>
            {prevPrompt.map((item, index) => { // Fixed typo here as well
              return (
                <div className='recent-entry' key={`${index}-${item}`}>
                  <img src={assets.message_icon} alt="" />
                  <p>{item}...</p>
                </div>
              );
            })}
          </div>
          : null
        }
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;