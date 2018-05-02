import React, {Component} from 'react'
import {connect} from "react-redux"
import {Button, Modal, Form, Input, Icon, notification} from 'antd';
import {loginUser} from "../../actions/index"
const FormItem = Form.Item;

const LoginUserForm = Form.create()(
    class extends Component {
        render() {
            const {visible, onCancel, onCreate, form} = this.props;
            const {getFieldDecorator} = form;
            return (
                <Modal visible={visible} title="Welcome Back!" okText="Login" onCancel={onCancel} onOk={onCreate}>
                    <Form layout="vertical">
                        <FormItem label="Username:">
                            {getFieldDecorator('username', {
                                rules: [{
                                        required: true,
                                        message: 'Please input your username'
                                    }]
                            })(<Input prefix={<Icon type="user" />} />)}
                        </FormItem>
                        <FormItem label="Password:">
                            {getFieldDecorator('password', {
                                rules: [{
                                        required: true,
                                        message: 'Please input your password'
                                    }]
                            })(<Input prefix={<Icon type="lock" />} type="password" />)}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    });

    class Login extends Component {
        componentWillReceiveProps(nextProps) {
            if (nextProps.user.status.length > 1) {
                this.loginErrorMsg('error', nextProps.user.status)
            }
        }
        state = {
            visible: false
        };
        showModal = () => {
            this.setState({visible: true});
        }
        handleCancel = () => {
            this.setState({visible: false});
        }
        handleLogin = () => {        
            const form = this.formRef.props.form;
            form.validateFields((err, values) => {
                if (err) {return}
                this.props.onLoginUser(values)
                form.resetFields();
                this.setState({visible: false});
            });
        }
        loginErrorMsg = (type, message) => {
            notification[type]({
              message: 'Login Error',
              description: message
            });
        };
        saveFormRef = (formRef) => {
            this.formRef = formRef;
        }
        render() {
            return (
                <div>
                    <Button onClick={this.showModal}>Login</Button>
                    <LoginUserForm
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleLogin}/>
                </div>
            );
        }
    }

const mapStateToProps = ({ user }) => { return { user }}

const mapDispatchToProps = dispatch => {
    return { onLoginUser: (userInfo) => loginUser(userInfo, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)