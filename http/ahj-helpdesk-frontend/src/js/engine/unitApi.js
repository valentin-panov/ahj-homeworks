/* eslint-disable class-methods-use-this */
import createReq from './createReq';

export default class UnitAPI {
  listing() {
    const options = {
      method: 'GET',
      query: `method=allTickets`,
    };
    return createReq(options);
  }

  create(data) {
    const options = {
      method: 'POST',
      query: `method=createTicket`,
      data,
    };
    return createReq(options);
  }

  delete(id) {
    const options = {
      method: 'GET',
      query: `method=deleteById&id=${id}`,
    };
    return createReq(options);
  }

  update(id, data) {
    const options = {
      method: 'POST',
      query: `method=updateById&id=${id}`,
      data,
    };
    return createReq(options);
  }

  get(id) {
    const options = {
      method: 'GET',
      query: `method=ticketById&id=${id}`,
    };
    return createReq(options);
  }
}
