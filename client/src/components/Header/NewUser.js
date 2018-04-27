import React, {Component} from 'react'
import {connect} from "react-redux"
import {Button, Modal, Form, Input, Icon} from 'antd';
import {createUser} from "../../actions/index"
const FormItem = Form.Item;


const UserCreateForm = Form.create()(
    class extends Component {
        render() {
        const {visible, onCancel, onCreate, form} = this.props;
        const {getFieldDecorator} = form;
        return (
            <Modal visible={visible} title="Create a New Account" okText="Create" onCancel={onCancel} onOk={onCreate}>
                <Form layout="vertical">
                    <FormItem label="Username:">
                        {getFieldDecorator('username', {
                            rules: [{
                                    required: true,
                                    min: 5,
                                    message: 'Please input a username more than 5 characters in length'
                                }]
                        })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Minimum 5 Characters"/>)}
                    </FormItem>
                    <FormItem label="Password:">
                        {getFieldDecorator('password', {
                            rules: [{
                                    required: true,
                                    min: 5,
                                    message: 'Please input a password more than 5 characters in length'
                                }]
                        })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Minimum 5 Characters"/>)}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
});

class NewUser extends Component {
    state = {
        visible: false
    };
    showModal = () => {
        this.setState({visible: true});
    }
    handleCancel = () => {
        this.setState({visible: false});
    }
    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {return}
            this.props.onNewUser(values)
            form.resetFields();
            this.setState({visible: false});
        });
    }
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }
    render() {
        return (
            <div>
                <Button onClick={this.showModal}>New User</Button>
                <UserCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}/>
            </div>
        );
    }
}

const mapStateToProps = ({ user }) => { return { user }}

const mapDispatchToProps = dispatch => {
    return { onNewUser: (userInfo) => createUser(userInfo, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewUser)