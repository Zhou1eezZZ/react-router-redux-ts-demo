import * as React from 'react';
import { Card, PageHeader, Input, Button, message } from 'antd';
import style from './article.module.scss';
import { connect } from 'react-redux';

interface IState {
    articleId: string;
    userInput: string;
}

interface IProps {
    history: any;
    match: any;
    articles: any;
    addArticle: any;
}

// PureComponent会对数据进行浅比较，若引用地址没变就不会更新，需要注意此组件内的shouldComponentUpdate不能被重写
class article extends React.PureComponent<IProps, IState> {
    state = {
        articleId: '',
        userInput: ''
    };
    toDetailPage = (id: number) => {
        this.props.history.push(`/article/${id}`);
    };
    componentDidUpdate() {
        if (this.props.match.params.id) {
            this.setState({
                articleId: this.props.match.params.id
            });
        } else {
            this.setState({
                articleId: ''
            });
        }
    }
    handleChange = (e: any): void => {
        this.setState({
            userInput: e.target.value
        });
    };
    handleAdd = (): void => {
        if (this.state.userInput) {
            this.props.addArticle(this.state.userInput);
            this.setState({
                userInput: ''
            });
        } else {
            message.warning('请输入文章标题！！！');
        }
    };
    render() {
        let cards = this.props.articles.map(
            (e: { id: number; title: string }) => {
                return (
                    <Card
                        size='small'
                        title={e.title}
                        style={{ width: 300 }}
                        className={style['card']}
                        key={e.id}
                        onClick={() => this.toDetailPage(e.id)}
                    >
                        <p>{`The id of this article is ${e.id}`}</p>
                    </Card>
                );
            }
        );
        return (
            <div>
                {this.state.articleId ? (
                    <div>
                        <PageHeader
                            className={style['page-header']}
                            onBack={() => this.props.history.push('/article')}
                            title='文章详情页'
                            subTitle={`This is article ${this.state.articleId}`}
                        />
                        <p>{`This is article ${this.state.articleId}`}</p>
                        <p>...</p>
                    </div>
                ) : (
                    <div>
                        <p>Article page</p>
                        <div className={style['addArticle']}>
                            <Input
                                className={style['userInput']}
                                value={this.state.userInput}
                                onChange={this.handleChange}
                                placeholder='输入要添加的文章标题'
                            />
                            <Button onClick={this.handleAdd}>添加</Button>
                        </div>
                        <div>{cards}</div>
                    </div>
                )}
            </div>
        );
    }
}

//这里定义要从state中读取的值
const mapStateToProps = (state: any): any => {
    return {
        articles: state.articles.articles
    };
};

//这里定义dispatch方法函数
const mapDispatchToProps = (dispatch: any): any => {
    return {
        addArticle: (title: string) => {
            dispatch({ type: 'ADD_ARTICLE', payload: { title: title } });
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(article);
