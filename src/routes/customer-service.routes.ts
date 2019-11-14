import { Router } from 'express';
import { createCustomer, getCustomer, updateCustomer, deleteCustomer, fetchAllCustomers,fetchCustomerOrdersById } from '../controllers/customer-service.controller';
const router = Router();

router.route('/')
    // .get(getCustomers)
    .post(createCustomer);

router.route('/customerinfo')
    .post(fetchAllCustomers);

router.route('/customerinfo/customerorders')
    .post(fetchCustomerOrdersById)

router.route('/customerinfo/:customerId')
    .get(getCustomer)
    .put(updateCustomer)
    .delete(deleteCustomer);
// .post(createCustomer);

export default router;