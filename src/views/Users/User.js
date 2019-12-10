import React from 'react';
import _ from 'lodash';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

//------redux
import { connect } from 'react-redux'
import { userActions } from '../../_actions'
// import { userModel } from '../../_dataModel'

// import { h_confirm } from '../../_helper'

const User = ({userData, onPostCreate, onPutUpdate, onGetById, ...props}) => {


  // const user = usersData.find(user => user.id.toString() === this.props.match.params.id)

  // const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]

  const id = _.get(props, "match.params.id")

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg={6}>
          <Card>
            <CardHeader>
              <strong><i className="icon-info pr-1"></i>User id: {id}</strong>
            </CardHeader>
            <CardBody>
              hihihi
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}



// ============================================= Redux
function mapState(state) {
  return {
    userData: state.userData.data
  };
}

const actionCreators = {
  onPostCreate: userActions.post_create,
  onPutUpdate: userActions.put_update,
  onGetById: userActions.get_byId
};

export default connect(mapState, actionCreators)(User);