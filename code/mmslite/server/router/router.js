const router = require('express').Router()
const Roles = require('../controller/role')
const Auth = require('../tools/auth')
const User = require('../controller/user')
const District = require('../controller/district')
const Inquiry = require('../controller/inquiry')
const Stall = require('../controller/stall')
const Vendor = require('../controller/vendor')
const Invoice = require('../controller/invoice')
const ReportVendor = require('../controller/reportVendor')
const ReportInvoice = require('../controller/reportInvoice')
const ReportProduct = require('../controller/reportProduct')
const Product = require('../controller/product')
const Market = require ('../controller/market')
const AuthSecure = require('../tools/auth.secure')
const fileupload = require('express-fileupload')
const Order = require('../controller/orders')
const Reservation = require('../controller/reservation')
//Begin Auth

router.post('/user-login', Auth.post.login)


//End Auth

// User Begin
router.post('/user', User.post.create)
router.put('/edit-password',User.put.editPassword)
router.post('/vendor/profile', User.get.profileById)
router.put('/vendor/update-setting', User.put.updateSetting)
//User End

//Begin Role

router.get('/roles',  Roles.get.roles)
router.get('/user-role/:user', Roles.get.roleByUsername)


//End Roles

//Begin District
router.get('/districts', District.get.districts)
//End District

//Begin Inquiry
router.get('/inquiry', Inquiry.get.Inquiries)
router.get('/totalinquiry', Inquiry.get.totalInquiry)
router.post('/vendor/create-inquiry', Inquiry.post.newInquiry)
//End

//Begin Stall
router.get('/customer/stalls', Stall.stall.get.stallView)
router.post('/customer/product-stall', Product.get.productByStall)
router.get('/customer/stall-category', Stall.stall.get.stallCategory)
router.get('/totalstall', Stall.stall.get.totalStall)
router.get('/admin/stalls-cayo',Stall.stall.get.stallInCayo)
router.get('/admin/stalls-corozal', Stall.stall.get.stallInCorozal)
router.get('/admin/stalls-orange', Stall.stall.get.stallInOrange)
router.get('/admin/stalls-belize', Stall.stall.get.stallInBelize)
router.get('/admin/stalls-stann', Stall.stall.get.stallInStann)
router.get('/admin/stalls-toledo', Stall.stall.get.stallInToledo)
router.post('/admin/stalls-code', Stall.stall.get.viewStallByCode)
router.get('/admin/stalls', Stall.stall.get.byStallName)
// router.post('/admin/stalls', Stall.stall.get.stallByMarket)
router.post('/admin/create-stall', fileupload(), Stall.stall.post.addStall)
router.put('/admin/update-stall', Stall.stall.put.updateStall)

//End 

//Begin Vendor

router.get('/totalvendor', Vendor.get.totalVendor)
router.post('/vendor/stalls-total', Vendor.get.totalVendorStall)
router.post('/vendor/latest-invoice', Vendor.get.latestInvoice)
//End 

//Begin Invoice - Vendor
//router.use('/vendor', AuthSecure)
router.get('/totalinvoice', Invoice.get.totalInvoice)

router.post('/vendor/invoice-reserve', Invoice.get.byReservationId)
router.post('/vendor/totalexpense', Invoice.get.totalExpense)
router.post('/vendor/invoicestatus', Invoice.get.invoiceStatus)
router.post('/vendor/invoice-report', Invoice.get.invoiceReport)
router.get('/admin/invoices', Invoice.get.invoiceList)
router.get('/admin/invoice-pending', Invoice.get.invoicePending)
router.get('/admin/invoice-total', Invoice.get.totalPaidPending)
router.post('/admin/invoices-id' ,Invoice.get.viewInvoiceByNo)
router.post('/admin/create-invoice', Invoice.post.createInvoice)
router.put('/admin/update-invoice', Invoice.put.updateInvoiceStatus)

//End

//Begin Vendor Reports
router.get('/vendor/expense-pdf', ReportVendor.get.getExpensePdf)
router.post('/vendor/create-expense-pdf', ReportVendor.post.expensePdf)
router.get('/vendor/invoice-pdf',ReportInvoice.get.getInvoicePdf)
router.post('/vendor/create-invoice-pdf', ReportInvoice.post.invoicePdf)
router.get('/vendor/product-pdf', ReportProduct.get.getStockPdf)
router.post('/vendor/create-product-pdf', ReportProduct.post.stockPdf)

//End

//Begin Product
router.post('/vendor/product-stock', Product.get.productStock)
router.post('/vendor/create-product', fileupload(), Product.post.addProduct)
router.post('/vendor/product-vendor', Product.get.vendorProduct)

// End

//Begin Market - Admin

router.get('/admin/markets', Market.get.markets)
//

//Begin Order

router.post('/vendor/orders', Order.get.byReservation)
router.post('/vendor/order-details', Order.get.byId)
router.put('/vendor/update-order', Order.put.updateOrder)
router.post('/vendor/bill-end', Reservation.get.endStatusById)
router.put('/vendor/update-reserve-date', Reservation.put.updateEnd)
router.post('/vendor/stall-reserve', Reservation.get.reservationDetails)
router.put('/vendor/update-reserve', Reservation.put.updateDetails)
//



module.exports=router