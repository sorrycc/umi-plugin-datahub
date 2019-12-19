import React from 'react';
import { Spin } from 'antd';
import { IUiApi } from 'umi-types';
import styles from './dataHub.module.less';


export interface TestProps {
  api: IUiApi;
}

const Test: React.SFC<TestProps> = (props) => {
  console.log('props', props);
  const { callRemote } = props.api;
  const [port, setPort] = React.useState();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const getPort = async () => {
      const { port } = await callRemote({
        type: 'org.umi.datahub.getPort'
      })
      console.log('port ready', port);
      setPort(port);
    }
    getPort();
  }, []);

  const onIframeReady = () => {
    setLoading(false);
  }

  return (
    <div className={styles.spin} style={{ height: '100%' }}>
      <Spin spinning={loading}>
        {port &&
          <iframe onLoad={onIframeReady} src={`http://127.0.0.1:${port}`} width="100%" height="100%" frameBorder="0"></iframe>
        }
     </Spin>
    </div>
  );
};

export default Test;