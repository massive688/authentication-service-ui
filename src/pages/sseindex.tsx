import React from 'react';

class Sseindex extends React.Component<any, any> {
  state: any = {
    list: [],
  };
  constructor(props: any) {
    super(props);
  }
  componentDidMount(): void {
    const { list } = this.state;
    list.push('ev.data');
    this.setState({ list: list });
  }

  render(): React.ReactNode {
    const { list } = this.state;
    return (
      <div>
        {list.map((item: any) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    );
  }
}
export default Sseindex;
