-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2022 at 11:23 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `marketdb`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `getInvoiceByReservationId` (`username` VARCHAR(100))  SELECT B.invoiceNumber, B.dueDate  , B.total, B.status,  R.fee RFee,  E.fee EFee,  W.fee WFee,  O.fee OFee
FROM bill B 
JOIN rental R ON B.id = R.bill_id 
JOIN electricity E ON B.id = E.bill_id 
JOIN water W On B.id = W.bill_id 
JOIN other O ON B.id = O.bill_id 
join reservation re on re.id = B.reservation_id
join user u on u.id = re.user_id
WHERE u.username = username
ORDER BY B.id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getOrderDetails` (IN `ID` INT)  SELECT O.name, P.name PName, OI.price, OI.quantity
FROM order_item OI
JOIN product P 
ON OI.product_id = P.id
JOIN `orders` O 
ON OI.order_id = O.id
WHERE OI.order_id = ID$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getOrdersByReservationId` (`username` VARCHAR(100))  SELECT DISTINCT O.id, O.name, O.contact_no, O.total, DATE_FORMAT(`date`, "%e %b %Y") `date`, O.mode, O.message, O.status 
FROM orders O 
INNER JOIN order_item OI 
ON O.id = OI.order_id 
INNER JOIN product P 
ON OI.product_id = P.id
inner join reservation r on r.id = p.reservation_id
inner join user u on u.id = r.user_id
WHERE u.username = username
ORDER BY date DESC$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getReservationDetails` (`username` VARCHAR(100))  SELECT RV.id, S.code_name, DATE_FORMAT(`start`, "%e %b %Y") `start`, DATE_FORMAT(`end`, "%e %b %Y") `end`, RV.business_name, RV.business_email, RV.business_tel, RV.facebook, RV.instagram, C.type, RV.about_us, RV.deposit, RV.status
FROM `reservation` RV
JOIN stall S 
ON RV.stall_id = S.id
JOIN category C 
ON RV.category_id = C.id
join user u on u.id = RV.user_id
WHERE u.username = username$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getVendorProfile` (IN `username` VARCHAR(100))  SELECT U.id, U.name, U.address1, U.address2, D.name district, U.tel, U.email,  U.username, U.password, U.status
FROM `user` U
JOIN district D 
ON U.district_id = D.id
WHERE U.username = username$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_createInquiry` (`iusername` VARCHAR(200), `isubject` VARCHAR(100), `imsg` VARCHAR(200), `idate` DATE)  BEGIN
	insert into inquiry(user_id, subject, date, details) values((select id from user where username = iusername), isubject, idate, imsg);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_createInvoice` (`stall` VARCHAR(50), `total` INT, `dDate` DATE, `rFee` INT, `eFee` INT, `wFee` INT, `oFee` INT, `oDetails` VARCHAR(100))  BEGIN
	insert into bill(reservation_id, total, status, dueDate, invoiceNumber) values((select getReserveId(stall)),total, 'PP', dDate, (select getInvoiceNumber()));
    insert into rental(bill_id, fee, status) values((select max(id) from bill), rFee, 'N/A');
    insert into electricity(bill_id, fee,status) values((select max(id) from bill),eFee, 'N/A');
    insert into water(bill_id, fee, status) values((select max(id) from bill),wFee,'N/A');
    insert into other(bill_id, fee,status, details) values((select max(id) from bill),oFee, 'N/A',oDetails);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_createProduct` (`username` VARCHAR(200), `sCode` VARCHAR(50), `pname` VARCHAR(45), `img` VARCHAR(100), `pprice` DECIMAL, `pstatus` VARCHAR(15), `details` VARCHAR(100))  BEGIN
	insert into product(reservation_id, code, name, image, price, status, description) values((select r.id from reservation r inner join user u on r.user_id = u.id where u.username = username), sCode, pname, img,( select CAST((COUNT(*) * pprice) AS DECIMAL(12,2))) 
,pstatus, details);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_createStall` (`stall` VARCHAR(200), `market` VARCHAR(200), `fee` INT, `stallImg` VARCHAR(200), `descript` VARCHAR(200))  BEGIN
	insert into stall(code_name, market_id, fee, virtual_view, status, description) values(stall, (select id from market m where m.m_name = market ),fee, stallImg,'A',descript);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getProductByStall` (`istall` VARCHAR(100))  BEGIN
	select p.id, p.name, p.image, p.price, p.status, p.description from product p inner join reservation r on r.id = p.reservation_id 
					    inner join stall s on s.id = r.stall_id
                        where s.code_name = istall;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getStallByMarket` (`mName` VARCHAR(100))  BEGIN
	select s.code_name from stall s inner join market m on s.market_id = m.id where m.m_name = mName;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_InvoiceReport` (`username` VARCHAR(100))  BEGIN
SELECT 
      (select getTotalPendInvoice(username)) as 'Pending', (select getSumPendingInvoice(username)) as `Total`;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_invoicestatus` (`username` VARCHAR(100))  BEGIN
	SELECT 
      (select getTotalPaidInvoice(username)) as 'Paid', (select getTotalPendInvoice(username)) as 'Pending'
    FROM
        ((`user` `u`
        JOIN `reservation` `r` ON (`r`.`user_id` = `u`.`id`))
        JOIN `bill` `b` ON (`r`.`id` = `b`.`reservation_id`))
        
    GROUP BY `b`.`reservation_id`;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_latestInvoiceByUser` (`username` VARCHAR(200))  BEGIN
SELECT DISTINCT
        `b`.`id` AS `id`,
        `b`.`invoiceNumber` AS `invoice`,
        `b`.`dueDate` AS `date`,
        `b`.`total` AS `total`,
        IF(`b`.`status` = 'p',
            'Paid',
            'Pending') AS `status`,
            
		e.fee as 'light',
        re.fee as 'rent',
        m.m_name as 'market',
        w.fee as 'water',
        o.fee as 'other',
        s.code_name as 'stall'
            
    FROM
        (((`bill` `b`
        JOIN `reservation` `r` ON (`b`.`reservation_id` = `r`.`id`))
        JOIN `stall` `s` ON (`s`.`id` = `r`.`stall_id`))
        join market m on s.market_id = m.id
        join water w on w.bill_id = b.id
        join other o on o.bill_id = b.id
        join electricity e on e.bill_id = b.id 
        join rental re on re.bill_id = b.id
        JOIN `user` `u` ON (`u`.`id` = `r`.`user_id`)) 
        where b.id = (select max(id) from bill) and u.username = username
    GROUP BY `b`.`invoiceNumber`;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_procedure` (`username` VARCHAR(200), `sCode` VARCHAR(50), `pname` VARCHAR(45), `img` VARCHAR(100), `pprice` INT, `pstatus` VARCHAR(15), `details` VARCHAR(100))  BEGIN
	insert into product(reservation_id, code, name, image, price, status, description) values((select r.id from reservation r inner join user u on r.user_id = u.id where u.username = username), sCode, pname, img, pprice,pstatus, details);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_stallByMarket` (`market` VARCHAR(200))  BEGIN
	select s.code_name as 'stall' from stall s inner join market m on s.market_id = m.id  where m.m_name = market;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_stockAvailable` (`username` VARCHAR(100))  BEGIN
select  count(p.id) as 'stock'
 from user u inner join reservation r on u.id = r.user_id
					inner join stall s on r.stall_id = s.id 
                    inner join product p on p.reservation_id = r.id
                    where p.status = 'In Stock' and u.username = username;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_totalExpense` (`username` VARCHAR(80))  BEGIN
select  sum(e.fee) as 'Electricity', sum(w.fee) as 'Water', sum(re.fee) as 'Rental' from user u inner join reservation r on r.user_id = u.id inner join bill b on r.id = b.reservation_id 
						inner join electricity e on b.id = e.bill_id 
                        inner join rental re on re.bill_id = b.id
                        inner join water w on w.bill_id = b.id 
                        where u.username = username;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_totalPaidInvoice` (`username` VARCHAR(100))  BEGIN
SELECT 
        COUNT(`b`.`total`) AS `Total Paid`
    FROM
        ((`user` `u`
        JOIN `reservation` `r` ON (`r`.`user_id` = `u`.`id`))
        JOIN `bill` `b` ON (`r`.`id` = `b`.`reservation_id`))
    WHERE
        `b`.`status` = 'p' and u.username=username
    GROUP BY `b`.`reservation_id`;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_totalPendingInvoice` (`username` VARCHAR(100))  BEGIN
SELECT 
        COUNT(`b`.`total`) AS `Total Pending`
    FROM
        ((`user` `u`
        JOIN `reservation` `r` ON (`r`.`user_id` = `u`.`id`))
        JOIN `bill` `b` ON (`r`.`id` = `b`.`reservation_id`))
    WHERE
        `b`.`status` = 'pp' and u.username=username
    GROUP BY `b`.`reservation_id`;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_totalVendorStall` (`username` VARCHAR(200))  BEGIN
select count(s.id) as total from user u inner join reservation r on u.id = r.user_id
					 inner join stall s on s.id = r.stall_id where u.username =username;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_updateInvoiceStatus` (`invoice` VARCHAR(100), `stats` VARCHAR(50))  BEGIN

	update bill set status = (If(stats = 'Paid', 'P','PP')) where invoiceNumber = invoice;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_updateREnd` (`username` VARCHAR(100), `iend` DATE)  BEGIN
	UPDATE `reservation` SET `end` = iend
                    WHERE id = (select re.id from  reservation re inner join user u on u.id = re.user_id where u.username =username);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_updateStall` (`vstall` VARCHAR(200), `vstatus` VARCHAR(100))  BEGIN
	update stall set status = if(vstatus ='Available','A','UA')  where code_name = vstall;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_userRole` (`username` VARCHAR(100))  BEGIN
	select ut.type from user u inner join user_type ut on u.user_type_id = ut.id where u.username = username;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_create` (`nameUser` VARCHAR(60), `add1` VARCHAR(30), `add2` VARCHAR(30), `district` VARCHAR(15), `phone` VARCHAR(15), `email` VARCHAR(45), `uname` VARCHAR(45), `pwd` VARCHAR(45), `roles` VARCHAR(15))  BEGIN
	INSERT INTo user(name,address1, address2,district_id,tel,email, username, password, user_type_id,status)
    values(nameUser, add1, add2, (select id from district where name = district ), phone, email, uname, pwd, (select id from user_type where type = roles),1 );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_viewInvoiceByInvoiceNo` (`invoice` VARCHAR(200))  BEGIN
	select b.invoiceNumber as 'InvoiceNo', if(b.status = 'P', 'Paid', 'Pending') as 'Status', b.total as 'Total', b.dueDate as 'DueDate', re.fee as 'Rent', w.fee as 'Water', e.fee as 'Light', o.fee as 'Other', m.m_name as 'Market', s.code_name as 'Stall' 
					from bill b inner join reservation r on r.id = b.reservation_id
					 inner join stall s on s.id = r.stall_id
                     inner join market m on m.id = s.market_id
                     inner join water w on w.bill_id = b.id
                     inner join electricity e on e.bill_id = b.id
                     inner join rental re on re.bill_id = b.id
                     inner join other o on o.bill_id = b.id
                      where b.invoiceNumber = invoice;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_viewProductByVendor` (`username` VARCHAR(200))  BEGIN
select  p.id as 'id', p.name as 'product', p.price as 'price', p.image as 'image', p.description as 'detail',p.code as 'code', p.status as 'status' from  user u inner join reservation r on u.id = r.user_id
					  inner join product p on p.reservation_id = r.id where u.username = username;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_viewStallByCode` (`stall` VARCHAR(100))  BEGIN
select s.code_name as 'stall', if(s.status ='A','Available', 'Unavailable') as 'status', m.m_name as 'market', s.description as 'description' , s.fee as 'fee', `s`.`virtual_view` AS `stallimg` from stall s inner join market m on s.market_id = m.id 
					  inner join district d on d.id = m.district_id
						where d.name = "Cayo" and s.code_name = stall;
END$$

--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `getInvoiceNumber` () RETURNS VARCHAR(60) CHARSET utf8 BEGIN
declare inv varchar(60);
declare data varchar(60);
 set data = (select max(id) from bill);
set inv = (select concat('INV-00', data +1));
 
 
RETURN inv;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `getReserveId` (`stallName` VARCHAR(100)) RETURNS INT(11) BEGIN
declare rId int;
set rId =(select r.id from stall s inner join reservation r on s.id = r.stall_id where s.code_name = stallName);
	
RETURN rId;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `getSumPendingInvoice` (`username` VARCHAR(100)) RETURNS VARCHAR(60) CHARSET utf8 BEGIN
declare inv varchar(60);
set inv = (select sum(b.total) from user u inner join reservation r on u.id = r.user_id
					 inner join bill b on b.reservation_id = r.id
                     where b.status = 'PP' and u.username = username);
RETURN inv;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `getTotalPaidInvoice` (`username` VARCHAR(60)) RETURNS VARCHAR(40) CHARSET utf8 BEGIN
declare dataP varchar(40);
set dataP = (SELECT 
        COUNT(`b`.`total`) AS `Total Pending`
    FROM
        ((`user` `u`
        JOIN `reservation` `r` ON (`r`.`user_id` = `u`.`id`))
        JOIN `bill` `b` ON (`r`.`id` = `b`.`reservation_id`))
    WHERE
        `b`.`status` = 'p' and u.username=username
    GROUP BY `b`.`reservation_id`);

RETURN dataP;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `getTotalPendInvioce` (`username` VARCHAR(100)) RETURNS VARCHAR(40) CHARSET utf8 BEGIN
	declare dataP varchar(40);
set dataP = (SELECT 
        COUNT(`b`.`total`) AS `Total Pending`
    FROM
        ((`user` `u`
        JOIN `reservation` `r` ON (`r`.`user_id` = `u`.`id`))
        JOIN `bill` `b` ON (`r`.`id` = `b`.`reservation_id`))
    WHERE
        `b`.`status` = 'pp' and u.username=username
    GROUP BY `b`.`reservation_id`);
RETURN dataP;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `getTotalPendInvoice` (`username` VARCHAR(100)) RETURNS VARCHAR(40) CHARSET utf8 BEGIN
	declare dataP varchar(40);
set dataP = (SELECT 
        COUNT(`b`.`total`) AS `Total Pending`
    FROM
        ((`user` `u`
        JOIN `reservation` `r` ON (`r`.`user_id` = `u`.`id`))
        JOIN `bill` `b` ON (`r`.`id` = `b`.`reservation_id`))
    WHERE
        `b`.`status` = 'pp' and u.username=username
    GROUP BY `b`.`reservation_id`);
RETURN dataP;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

CREATE TABLE `bill` (
  `id` int(11) NOT NULL,
  `reservation_id` int(11) NOT NULL,
  `total` int(11) DEFAULT NULL,
  `status` varchar(15) NOT NULL,
  `createdts` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `dueDate` date DEFAULT NULL,
  `invoiceNumber` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bill`
--

INSERT INTO `bill` (`id`, `reservation_id`, `total`, `status`, `createdts`, `dueDate`, `invoiceNumber`) VALUES
(1, 1, 125, 'PP', '2022-05-07 04:24:58.000000', '2020-05-06', 'INV-001'),
(2, 1, 100, 'P', '2022-05-07 04:24:58.000000', '2020-05-06', 'INV-002'),
(3, 1, 200, 'PP', '2022-05-11 00:15:49.360980', '2022-04-30', 'INV-003'),
(4, 1, 175, 'P', '2022-05-11 00:17:32.016234', '2022-04-30', 'INV-004'),
(5, 1, 239, 'PP', '2022-05-16 08:31:52.101397', '2022-05-16', 'INV-005'),
(6, 1, 283, 'PP', '2022-05-16 17:11:21.168560', '2022-05-07', 'INV-006');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `type` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `type`) VALUES
(1, 'Fruits and Vegetables');

-- --------------------------------------------------------

--
-- Table structure for table `district`
--

CREATE TABLE `district` (
  `id` int(11) NOT NULL,
  `name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `district`
--

INSERT INTO `district` (`id`, `name`) VALUES
(1, 'Belize'),
(2, 'Cayo'),
(3, 'Corozal'),
(4, 'Orange Walk'),
(5, 'Stann Creek'),
(6, 'Toledo');

-- --------------------------------------------------------

--
-- Table structure for table `electricity`
--

CREATE TABLE `electricity` (
  `bill_id` int(11) NOT NULL,
  `fee` int(11) DEFAULT 0,
  `status` varchar(15) DEFAULT 'N/A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `electricity`
--

INSERT INTO `electricity` (`bill_id`, `fee`, `status`) VALUES
(1, 0, 'N/A'),
(2, 0, 'N/A'),
(3, 50, 'N/A'),
(4, 50, 'N/A'),
(5, 100, 'N/A'),
(6, 98, 'N/A');

-- --------------------------------------------------------

--
-- Table structure for table `inquiry`
--

CREATE TABLE `inquiry` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `date` datetime NOT NULL,
  `details` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `inquiry`
--

INSERT INTO `inquiry` (`id`, `user_id`, `subject`, `date`, `details`) VALUES
(1, 2, 'Jane\'s number', '2022-04-01 02:30:25', 'Hello, I would like to request Jane\'s number.'),
(2, 2, 'Stall Water', '2022-05-15 00:00:00', 'Need urgent water meter repair'),
(4, 2, 'Light Issue', '2022-05-15 00:00:00', 'Front Stall Light needs repair'),
(5, 2, 'Issue Light', '2022-05-16 00:00:00', 'Stall Number - SI-AA');

-- --------------------------------------------------------

--
-- Stand-in structure for view `inquiry_view`
-- (See below for the actual view)
--
CREATE TABLE `inquiry_view` (
`id` int(11)
,`name` varchar(60)
,`subject` varchar(100)
,`details` mediumtext
,`date` varchar(10)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `invoicepaid_view`
-- (See below for the actual view)
--
CREATE TABLE `invoicepaid_view` (
`id` int(11)
,`Invoice` varchar(100)
,`Date` date
,`total` int(11)
,`Status` varchar(7)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `invoicepending_view`
-- (See below for the actual view)
--
CREATE TABLE `invoicepending_view` (
`id` int(11)
,`Invoice` varchar(100)
,`Date` date
,`total` int(11)
,`Status` varchar(7)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `invoice_view`
-- (See below for the actual view)
--
CREATE TABLE `invoice_view` (
`id` int(11)
,`Invoice` varchar(100)
,`Date` date
,`total` int(11)
,`Status` varchar(7)
);

-- --------------------------------------------------------

--
-- Table structure for table `market`
--

CREATE TABLE `market` (
  `id` int(11) NOT NULL,
  `code_name` varchar(7) NOT NULL,
  `m_name` varchar(25) NOT NULL,
  `address1` varchar(30) DEFAULT NULL,
  `address2` varchar(30) NOT NULL,
  `district_id` int(11) NOT NULL,
  `grid_map` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `market`
--

INSERT INTO `market` (`id`, `code_name`, `m_name`, `address1`, `address2`, `district_id`, `grid_map`) VALUES
(1, 'SI-22', 'San Ignacio Market', 'Main Road', 'San Ignacio', 2, 'gridMap-SIM.png'),
(2, 'BP-23', 'Belmopan Market', 'Bliss Parade', 'Belmopan', 2, 'gridMap-SIM.png');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `contact_no` varchar(15) NOT NULL,
  `total` decimal(5,2) DEFAULT NULL,
  `mode` varchar(15) DEFAULT NULL,
  `date` datetime NOT NULL,
  `status` varchar(45) DEFAULT 'Pending',
  `message` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `name`, `contact_no`, `total`, `mode`, `date`, `status`, `message`) VALUES
(1, 'Marshal Matters', '623-4567', '4.00', 'Pick Up', '2022-04-01 02:30:25', 'Confirmed', 'Will pick it up at 10 a.m.');

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

CREATE TABLE `order_item` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price` decimal(5,2) NOT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `order_item`
--

INSERT INTO `order_item` (`id`, `order_id`, `product_id`, `price`, `quantity`) VALUES
(1, 1, 3, '1.00', 2),
(2, 1, 6, '1.00', 2);

-- --------------------------------------------------------

--
-- Table structure for table `other`
--

CREATE TABLE `other` (
  `bill_id` int(11) NOT NULL,
  `fee` int(11) DEFAULT 0,
  `status` varchar(15) DEFAULT 'N/A',
  `details` varchar(200) DEFAULT 'None'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `other`
--

INSERT INTO `other` (`bill_id`, `fee`, `status`, `details`) VALUES
(1, 0, 'N/A', 'None'),
(2, 0, 'N/A', 'None'),
(3, 50, 'N/A', 'Security'),
(4, 25, 'N/A', 'Security'),
(5, 0, 'N/A', '0'),
(6, 0, 'N/A', '0');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `reservation_id` int(11) NOT NULL,
  `code` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `price` decimal(5,2) DEFAULT NULL,
  `status` varchar(15) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `reservation_id`, `code`, `name`, `image`, `price`, `status`, `description`) VALUES
(3, 1, 'AP-20', 'Apple', 'uploads/1652602907069.jpg', '1.00', 'In Stock', 'Per Unit'),
(6, 1, 'OR-20', 'Orange', 'uploads/1652603737621.jpg', '1.00', 'In Stock', 'Per Unit'),
(11, 1, 'VF-34', 'Carrot', 'uploads/1652721261330.jpg', '2.00', 'In Stock', 'Per unit');

-- --------------------------------------------------------

--
-- Table structure for table `rental`
--

CREATE TABLE `rental` (
  `bill_id` int(11) NOT NULL,
  `fee` int(11) DEFAULT 0,
  `status` varchar(15) DEFAULT 'N/A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rental`
--

INSERT INTO `rental` (`bill_id`, `fee`, `status`) VALUES
(1, 100, 'P'),
(2, 100, 'P'),
(3, 50, 'N/A'),
(4, 50, 'N/A'),
(5, 89, 'N/A'),
(6, 85, 'N/A');

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `stall_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `business_name` varchar(45) DEFAULT NULL,
  `business_tel` varchar(45) DEFAULT NULL,
  `business_email` varchar(45) DEFAULT NULL,
  `facebook` varchar(45) DEFAULT NULL,
  `instagram` varchar(45) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `about_us` varchar(45) DEFAULT NULL,
  `deposit` int(11) DEFAULT NULL,
  `status` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reservation`
--

INSERT INTO `reservation` (`id`, `stall_id`, `user_id`, `start`, `end`, `business_name`, `business_tel`, `business_email`, `facebook`, `instagram`, `category_id`, `about_us`, `deposit`, `status`) VALUES
(1, 1, 2, '2022-03-01', '2023-05-16', 'John\'s Organic Fruits', '660-1297', 'jorganicfruit@gmail.com', '', '', 1, 'We sell a variety of fresh, organic fruits', 100, '1');

-- --------------------------------------------------------

--
-- Table structure for table `stall`
--

CREATE TABLE `stall` (
  `id` int(11) NOT NULL,
  `code_name` varchar(7) NOT NULL,
  `market_id` int(11) NOT NULL,
  `fee` int(11) NOT NULL,
  `virtual_view` varchar(250) DEFAULT NULL,
  `status` varchar(15) NOT NULL DEFAULT 'A',
  `description` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `stall`
--

INSERT INTO `stall` (`id`, `code_name`, `market_id`, `fee`, `virtual_view`, `status`, `description`) VALUES
(1, 'SI-AA', 1, 85, 'uploads/1652402234584.jpg', 'UA', 'The stall size is 10 by 10'),
(2, 'SI-B1', 1, 80, 'uploads/1652402234584.jpg', 'UA', '12ft by 12ft in size'),
(3, 'SI-B2', 1, 100, 'uploads/1652402234584.jpg', 'A', '11ft by 11ft in size'),
(4, 'BP-AA', 2, 90, 'uploads/1652402234584.jpg', 'A', '12 ft by 12 by in size'),
(5, 'SI-B3', 1, 85, 'uploads/1652480644104.jpg', 'UA', '10 ft by 10 ft in size');

-- --------------------------------------------------------

--
-- Stand-in structure for view `stallsinbelize_view`
-- (See below for the actual view)
--
CREATE TABLE `stallsinbelize_view` (
`Stall` varchar(7)
,`status` varchar(11)
,`market` varchar(25)
,`description` mediumtext
,`stallimg` varchar(250)
,`fee` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `stallsincayo_view`
-- (See below for the actual view)
--
CREATE TABLE `stallsincayo_view` (
`Stall` varchar(7)
,`status` varchar(11)
,`market` varchar(25)
,`description` mediumtext
,`stallimg` varchar(250)
,`fee` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `stallsincorozal_view`
-- (See below for the actual view)
--
CREATE TABLE `stallsincorozal_view` (
`Stall` varchar(7)
,`status` varchar(11)
,`market` varchar(25)
,`description` mediumtext
,`stallimg` varchar(250)
,`fee` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `stallsinorange_view`
-- (See below for the actual view)
--
CREATE TABLE `stallsinorange_view` (
`Stall` varchar(7)
,`status` varchar(11)
,`market` varchar(25)
,`description` mediumtext
,`stallimg` varchar(250)
,`fee` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `stallsinstann_view`
-- (See below for the actual view)
--
CREATE TABLE `stallsinstann_view` (
`Stall` varchar(7)
,`status` varchar(11)
,`market` varchar(25)
,`description` mediumtext
,`stallimg` varchar(250)
,`fee` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `stallsintoledo_view`
-- (See below for the actual view)
--
CREATE TABLE `stallsintoledo_view` (
`Stall` varchar(7)
,`status` varchar(11)
,`market` varchar(25)
,`description` mediumtext
,`stallimg` varchar(250)
,`fee` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `stalls_view`
-- (See below for the actual view)
--
CREATE TABLE `stalls_view` (
`stall` varchar(7)
,`market` varchar(25)
,`district` varchar(15)
,`category` varchar(30)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `totalinquiry_view`
-- (See below for the actual view)
--
CREATE TABLE `totalinquiry_view` (
`total` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `totalinvoice_view`
-- (See below for the actual view)
--
CREATE TABLE `totalinvoice_view` (
`total` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `totalpaidpending_view`
-- (See below for the actual view)
--
CREATE TABLE `totalpaidpending_view` (
`Paid` bigint(21)
,`Pending` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `totalstall_view`
-- (See below for the actual view)
--
CREATE TABLE `totalstall_view` (
`total` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `totalvendor_view`
-- (See below for the actual view)
--
CREATE TABLE `totalvendor_view` (
`total` bigint(21)
);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `address1` varchar(30) NOT NULL,
  `address2` varchar(30) NOT NULL,
  `district_id` int(11) NOT NULL,
  `tel` varchar(15) NOT NULL,
  `email` varchar(200) DEFAULT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(225) NOT NULL,
  `user_type_id` int(11) NOT NULL,
  `status` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `address1`, `address2`, `district_id`, `tel`, `email`, `username`, `password`, `user_type_id`, `status`) VALUES
(1, 'Imer Lopez', '18 Buena Vista Street', 'San Ignacio', 2, '627-4321', 'ilopez@gmail.com', 'admin', 'p4ssw0rld', 1, '1'),
(2, 'John Doe', 'Iguana Street', 'Belmopan', 2, '663-1234', 'johndoe@gmail.com', 'johndoe34', '$2b$10$QylZnWZJVUEBINiQi9k.vueBCAHhsleHDvBfnkufSO89OemcLvXfO', 2, '1'),
(3, 'Jane Doe', 'Melhado Street', 'San Ignacio', 2, '623-7931', 'janedoe@gmail.com', 'janedoe22', '12345678', 2, 'Active'),
(4, 'David Lucas', 'Military Street', 'San Ignacio Town', 4, '6072461', 'dlucas@gmail.com', 'dlucas', '$2b$10$gqxvum/idWsrW6JEe.X5suy2tkqWbVT95hbsUuDbLbdYvZO3vY8mu', 1, '1');

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

CREATE TABLE `user_type` (
  `id` int(11) NOT NULL,
  `type` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_type`
--

INSERT INTO `user_type` (`id`, `type`) VALUES
(1, 'Admin'),
(2, 'Vendor');

-- --------------------------------------------------------

--
-- Table structure for table `water`
--

CREATE TABLE `water` (
  `bill_id` int(11) NOT NULL,
  `fee` int(11) DEFAULT 0,
  `status` varchar(15) DEFAULT 'N/A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `water`
--

INSERT INTO `water` (`bill_id`, `fee`, `status`) VALUES
(1, 25, 'P'),
(2, 30, 'NP'),
(3, 50, 'N/A'),
(4, 50, 'N/A'),
(5, 50, 'N/A'),
(6, 100, 'N/A');

-- --------------------------------------------------------

--
-- Structure for view `inquiry_view`
--
DROP TABLE IF EXISTS `inquiry_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `inquiry_view`  AS SELECT `inquiry`.`id` AS `id`, (select `user`.`name` from `user` where `user`.`id` = `inquiry`.`user_id`) AS `name`, `inquiry`.`subject` AS `subject`, `inquiry`.`details` AS `details`, date_format(`inquiry`.`date`,'%Y-%m-%d') AS `date` FROM `inquiry` ;

-- --------------------------------------------------------

--
-- Structure for view `invoicepaid_view`
--
DROP TABLE IF EXISTS `invoicepaid_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `invoicepaid_view`  AS SELECT DISTINCT `b`.`id` AS `id`, `b`.`invoiceNumber` AS `Invoice`, `b`.`dueDate` AS `Date`, `b`.`total` AS `total`, if(`b`.`status` = 'p','Paid','Pending') AS `Status` FROM (((`bill` `b` join `reservation` `r` on(`b`.`reservation_id` = `r`.`id`)) join `stall` `s` on(`s`.`id` = `r`.`stall_id`)) join `user` `u` on(`u`.`id` = `r`.`user_id`)) WHERE `b`.`status` = 'P' GROUP BY `b`.`invoiceNumber` ;

-- --------------------------------------------------------

--
-- Structure for view `invoicepending_view`
--
DROP TABLE IF EXISTS `invoicepending_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `invoicepending_view`  AS SELECT DISTINCT `b`.`id` AS `id`, `b`.`invoiceNumber` AS `Invoice`, `b`.`dueDate` AS `Date`, `b`.`total` AS `total`, if(`b`.`status` = 'p','Paid','Pending') AS `Status` FROM (((`bill` `b` join `reservation` `r` on(`b`.`reservation_id` = `r`.`id`)) join `stall` `s` on(`s`.`id` = `r`.`stall_id`)) join `user` `u` on(`u`.`id` = `r`.`user_id`)) WHERE `b`.`status` = 'PP' GROUP BY `b`.`invoiceNumber` ;

-- --------------------------------------------------------

--
-- Structure for view `invoice_view`
--
DROP TABLE IF EXISTS `invoice_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `invoice_view`  AS SELECT DISTINCT `b`.`id` AS `id`, `b`.`invoiceNumber` AS `Invoice`, `b`.`dueDate` AS `Date`, `b`.`total` AS `total`, if(`b`.`status` = 'p','Paid','Pending') AS `Status` FROM (((`bill` `b` join `reservation` `r` on(`b`.`reservation_id` = `r`.`id`)) join `stall` `s` on(`s`.`id` = `r`.`stall_id`)) join `user` `u` on(`u`.`id` = `r`.`user_id`)) GROUP BY `b`.`invoiceNumber` ;

-- --------------------------------------------------------

--
-- Structure for view `stallsinbelize_view`
--
DROP TABLE IF EXISTS `stallsinbelize_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `stallsinbelize_view`  AS SELECT `s`.`code_name` AS `Stall`, if(`s`.`status` = 'A','Available','Unavailable') AS `status`, `m`.`m_name` AS `market`, `s`.`description` AS `description`, `s`.`virtual_view` AS `stallimg`, `s`.`fee` AS `fee` FROM ((`stall` `s` join `market` `m` on(`s`.`market_id` = `m`.`id`)) join `district` `d` on(`d`.`id` = `m`.`district_id`)) WHERE `d`.`name` = 'Belize' ;

-- --------------------------------------------------------

--
-- Structure for view `stallsincayo_view`
--
DROP TABLE IF EXISTS `stallsincayo_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `stallsincayo_view`  AS SELECT `s`.`code_name` AS `Stall`, if(`s`.`status` = 'A','Available','Unavailable') AS `status`, `m`.`m_name` AS `market`, `s`.`description` AS `description`, `s`.`virtual_view` AS `stallimg`, `s`.`fee` AS `fee` FROM ((`stall` `s` join `market` `m` on(`s`.`market_id` = `m`.`id`)) join `district` `d` on(`d`.`id` = `m`.`district_id`)) WHERE `d`.`name` = 'Cayo' ;

-- --------------------------------------------------------

--
-- Structure for view `stallsincorozal_view`
--
DROP TABLE IF EXISTS `stallsincorozal_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `stallsincorozal_view`  AS SELECT `s`.`code_name` AS `Stall`, if(`s`.`status` = 'A','Available','Unavailable') AS `status`, `m`.`m_name` AS `market`, `s`.`description` AS `description`, `s`.`virtual_view` AS `stallimg`, `s`.`fee` AS `fee` FROM ((`stall` `s` join `market` `m` on(`s`.`market_id` = `m`.`id`)) join `district` `d` on(`d`.`id` = `m`.`district_id`)) WHERE `d`.`name` = 'Corozal' ;

-- --------------------------------------------------------

--
-- Structure for view `stallsinorange_view`
--
DROP TABLE IF EXISTS `stallsinorange_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `stallsinorange_view`  AS SELECT `s`.`code_name` AS `Stall`, if(`s`.`status` = 'A','Available','Unavailable') AS `status`, `m`.`m_name` AS `market`, `s`.`description` AS `description`, `s`.`virtual_view` AS `stallimg`, `s`.`fee` AS `fee` FROM ((`stall` `s` join `market` `m` on(`s`.`market_id` = `m`.`id`)) join `district` `d` on(`d`.`id` = `m`.`district_id`)) WHERE `d`.`name` = 'Orange Walk' ;

-- --------------------------------------------------------

--
-- Structure for view `stallsinstann_view`
--
DROP TABLE IF EXISTS `stallsinstann_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `stallsinstann_view`  AS SELECT `s`.`code_name` AS `Stall`, if(`s`.`status` = 'A','Available','Unavailable') AS `status`, `m`.`m_name` AS `market`, `s`.`description` AS `description`, `s`.`virtual_view` AS `stallimg`, `s`.`fee` AS `fee` FROM ((`stall` `s` join `market` `m` on(`s`.`market_id` = `m`.`id`)) join `district` `d` on(`d`.`id` = `m`.`district_id`)) WHERE `d`.`name` = 'Stann Creek' ;

-- --------------------------------------------------------

--
-- Structure for view `stallsintoledo_view`
--
DROP TABLE IF EXISTS `stallsintoledo_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `stallsintoledo_view`  AS SELECT `s`.`code_name` AS `Stall`, if(`s`.`status` = 'A','Available','Unavailable') AS `status`, `m`.`m_name` AS `market`, `s`.`description` AS `description`, `s`.`virtual_view` AS `stallimg`, `s`.`fee` AS `fee` FROM ((`stall` `s` join `market` `m` on(`s`.`market_id` = `m`.`id`)) join `district` `d` on(`d`.`id` = `m`.`district_id`)) WHERE `d`.`name` = 'Toledo' ;

-- --------------------------------------------------------

--
-- Structure for view `stalls_view`
--
DROP TABLE IF EXISTS `stalls_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `stalls_view`  AS SELECT `s`.`code_name` AS `stall`, `m`.`m_name` AS `market`, `d`.`name` AS `district`, `c`.`type` AS `category` FROM ((((`reservation` `r` join `stall` `s` on(`r`.`stall_id` = `s`.`id`)) join `market` `m` on(`m`.`id` = `s`.`market_id`)) join `district` `d` on(`d`.`id` = `m`.`district_id`)) join `category` `c` on(`c`.`id` = `r`.`category_id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `totalinquiry_view`
--
DROP TABLE IF EXISTS `totalinquiry_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `totalinquiry_view`  AS SELECT count(`inquiry`.`id`) AS `total` FROM `inquiry` ;

-- --------------------------------------------------------

--
-- Structure for view `totalinvoice_view`
--
DROP TABLE IF EXISTS `totalinvoice_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `totalinvoice_view`  AS SELECT count(`bill`.`id`) AS `total` FROM `bill` ;

-- --------------------------------------------------------

--
-- Structure for view `totalpaidpending_view`
--
DROP TABLE IF EXISTS `totalpaidpending_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `totalpaidpending_view`  AS SELECT (select count(`bill`.`id`) from `bill` where `bill`.`status` = 'P') AS `Paid`, (select count(`bill`.`id`) from `bill` where `bill`.`status` = 'PP') AS `Pending` ;

-- --------------------------------------------------------

--
-- Structure for view `totalstall_view`
--
DROP TABLE IF EXISTS `totalstall_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `totalstall_view`  AS SELECT count(`stall`.`id`) AS `total` FROM `stall` ;

-- --------------------------------------------------------

--
-- Structure for view `totalvendor_view`
--
DROP TABLE IF EXISTS `totalvendor_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `totalvendor_view`  AS SELECT count(`user`.`id`) AS `total` FROM `user` WHERE `user`.`user_type_id` = 2 ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `fk_bill_reservation1` (`reservation_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `district`
--
ALTER TABLE `district`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `electricity`
--
ALTER TABLE `electricity`
  ADD PRIMARY KEY (`bill_id`),
  ADD UNIQUE KEY `bill_id_UNIQUE` (`bill_id`);

--
-- Indexes for table `inquiry`
--
ALTER TABLE `inquiry`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `fk_c_inquiry_user1` (`user_id`);

--
-- Indexes for table `market`
--
ALTER TABLE `market`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idMarket_UNIQUE` (`id`),
  ADD KEY `fk_market_district1` (`district_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `fk_order_item_product1` (`product_id`),
  ADD KEY `fk_order_item_order1` (`order_id`);

--
-- Indexes for table `other`
--
ALTER TABLE `other`
  ADD PRIMARY KEY (`bill_id`),
  ADD UNIQUE KEY `bill_id_UNIQUE` (`bill_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `fk_stock_reservation1` (`reservation_id`);

--
-- Indexes for table `rental`
--
ALTER TABLE `rental`
  ADD PRIMARY KEY (`bill_id`),
  ADD UNIQUE KEY `bill_id_UNIQUE` (`bill_id`);

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `fk_reservation_user1` (`user_id`),
  ADD KEY `fk_reservation_stall1` (`stall_id`),
  ADD KEY `fk_reservation_category1` (`category_id`);

--
-- Indexes for table `stall`
--
ALTER TABLE `stall`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `fk_stall_market1` (`market_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_district1` (`district_id`),
  ADD KEY `fk_user_user_type1` (`user_type_id`);

--
-- Indexes for table `user_type`
--
ALTER TABLE `user_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `water`
--
ALTER TABLE `water`
  ADD PRIMARY KEY (`bill_id`),
  ADD UNIQUE KEY `bill_id_UNIQUE` (`bill_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bill`
--
ALTER TABLE `bill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `district`
--
ALTER TABLE `district`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `electricity`
--
ALTER TABLE `electricity`
  MODIFY `bill_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `inquiry`
--
ALTER TABLE `inquiry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `market`
--
ALTER TABLE `market`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `order_item`
--
ALTER TABLE `order_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `other`
--
ALTER TABLE `other`
  MODIFY `bill_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `rental`
--
ALTER TABLE `rental`
  MODIFY `bill_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `stall`
--
ALTER TABLE `stall`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_type`
--
ALTER TABLE `user_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `water`
--
ALTER TABLE `water`
  MODIFY `bill_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bill`
--
ALTER TABLE `bill`
  ADD CONSTRAINT `fk_bill_reservation1` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `electricity`
--
ALTER TABLE `electricity`
  ADD CONSTRAINT `fk_electricity_bill1` FOREIGN KEY (`bill_id`) REFERENCES `bill` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `inquiry`
--
ALTER TABLE `inquiry`
  ADD CONSTRAINT `fk_c_inquiry_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `market`
--
ALTER TABLE `market`
  ADD CONSTRAINT `fk_market_district1` FOREIGN KEY (`district_id`) REFERENCES `district` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `fk_order_item_order1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_order_item_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `other`
--
ALTER TABLE `other`
  ADD CONSTRAINT `fk_table2_bill2` FOREIGN KEY (`bill_id`) REFERENCES `bill` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `fk_stock_reservation1` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `rental`
--
ALTER TABLE `rental`
  ADD CONSTRAINT `fk_deposit_bill1` FOREIGN KEY (`bill_id`) REFERENCES `bill` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `fk_reservation_category1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_reservation_stall1` FOREIGN KEY (`stall_id`) REFERENCES `stall` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_reservation_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `stall`
--
ALTER TABLE `stall`
  ADD CONSTRAINT `fk_stall_market1` FOREIGN KEY (`market_id`) REFERENCES `market` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_user_district1` FOREIGN KEY (`district_id`) REFERENCES `district` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_user_type1` FOREIGN KEY (`user_type_id`) REFERENCES `user_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `water`
--
ALTER TABLE `water`
  ADD CONSTRAINT `fk_table2_bill1` FOREIGN KEY (`bill_id`) REFERENCES `bill` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
