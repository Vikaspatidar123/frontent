import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import General from '../FormSections/General';
import { modules } from '../../../constants/permissions';

const useCreateBonus = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [allFields, setAllFields] = useState({});
  const [nextPressed, setNextPressed] = useState('');

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const onNextClick = (tabId) => {
    setNextPressed(tabId);
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    navigate('/bonus/create');
  };

  const buttonList = useMemo(() => [
    {
      label: 'Create',
      handleClick: handleAddClick,
      link: '#!',
      module: modules.Bonus,
      operation: 'C',
    },
  ]);

  const tabData = useMemo(() => [
    {
      id: 1,
      title: 'General',
      component: (
        <General
          activeTab={activeTab}
          isNext={nextPressed === 1}
          setActiveTab={setActiveTab}
          setNextPressed={setNextPressed}
          setAllFields={setAllFields}
        />
      ),
    },
    {
      id: 2,
      title: 'Languages',
      component: <div />,
    },
    {
      id: 3,
      title: 'Currency',
      component: <div />,
    },
    {
      id: 4,
      title: 'Wagering Contribution',
      component: <div />,
    },
    {
      id: 5,
      title: 'Countries',
      component: <div />,
    },
  ]);

  return {
    tabData,
    toggleTab,
    activeTab,
    buttonList,
    onNextClick,
    allFields,
  };
};

export default useCreateBonus;
