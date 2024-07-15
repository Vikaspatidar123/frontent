import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import General from '../FormSections/General';
import { resetChatrain } from '../../../store/chatRain/actions';
import { getChannels } from '../../../store/actions';

const useCreateChatRain = ({ isEdit }) => {
  const { chatRainId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('general');
  const [allFields, setAllFields] = useState({});
  const [nextPressed, setNextPressed] = useState({});

  const { createChatrainSuccess, createChatrainError, updateChatrainSuccess, updateChatrainError, updateChatrainLoading, createChatrainLoading } = useSelector((state) => state.Chatrain);

  const chatRainDetails = location?.state?.chatRainDetails;

  useEffect(() => {
    dispatch(
      getChannels({
        limit: 20,
        pageNo: 1,
      })
    );
  }, []);

  useEffect(() => {
    if (createChatrainSuccess) {
      navigate('/chat/chat-rain');
    }
    if (createChatrainError) {
      setActiveTab('general');
    }
    dispatch(resetChatrain());
  }, [createChatrainSuccess, createChatrainError]);

  useEffect(() => {
    if (updateChatrainSuccess) {
      navigate('/chat/chat-rain');
    }
    if (updateChatrainError) {
      setActiveTab('general');
    }
    dispatch(resetChatrain());
  }, [updateChatrainSuccess, updateChatrainError]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const onNextClick = (current, next) => {
    setNextPressed({ currentTab: current, nextTab: next });
  };

  const tabData = [
    {
      id: 'general',
      title: 'General',
      component: (
        <General
          isLoading={false}
          activeTab={activeTab}
          nextPressed={nextPressed}
          setActiveTab={setActiveTab}
          setNextPressed={setNextPressed}
          setAllFields={setAllFields}
          chatRainDetails={chatRainDetails}
          isEdit={isEdit}
        />
      ),
    }
  ];

  return {
    tabData,
    toggleTab,
    activeTab,
    onNextClick,
    allFields,
    createChatrainLoading,
    updateChatrainLoading,
  };
};

export default useCreateChatRain;
