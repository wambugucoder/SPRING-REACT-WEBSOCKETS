import {Input, List, message, Avatar, Spin } from 'antd';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

function ChatRoom({messages,onChat}){
  const { Search } = Input;
  const [loading,setLoading]=useState(false)
  const [hasMore,setMore]=useState(true)

  const handleInfiniteOnLoad = () => {
    setLoading(true)
    if (messages.length > 14) {
      message.warning('Infinite List loaded all');
     setLoading(false)
     setMore(false)
      return;
    }
  }
 
    return(
        <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore={!loading && hasMore}
          useWindow={false}
        >
          <List
            dataSource={messages}
            renderItem={item => (
              <List.Item key={item.sender}>
                <List.Item.Meta
                 
                />
                <div>
                {item.messageType="CHAT"?
                    <div>
                        {item.content+" hias"}
                        
                    </div>
                    :
                    item.messageType="JOIN"?
                    
                    <div>
                        {item.sender + "Joined"}
                    </div>
                    :
                    <div></div>
                    }
                </div>
                    
                
              </List.Item>
            )}
          >
            {loading && hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
        <Search className="nametag"
        placeholder="Chat..."
        allowClear
        enterButton={"Join Chat😊"}
        size="large"
        maxLength={10}
        onSearch={onChat}
        />
      </div>
);
}
export default ChatRoom;