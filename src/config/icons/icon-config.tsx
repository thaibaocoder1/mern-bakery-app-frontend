import {
  BiDotsVerticalRounded,
  BiDownArrowAlt,
  BiFile,
  BiFilter,
  BiMinus,
  BiPhoneCall,
  BiRepost,
  BiSearchAlt,
  BiSolidTimer,
} from "react-icons/bi";
import { BsCashStack, BsClipboard2CheckFill, BsEyeFill, BsFillHandbagFill, BsQrCode } from "react-icons/bs";
import { CiBarcode, CiMoneyBill } from "react-icons/ci";
import {
  FaBirthdayCake,
  FaGoogle,
  FaList,
  FaRegUser,
  FaSortAmountDown,
  FaSortAmountUp,
  FaStar,
  FaUndo,
} from "react-icons/fa";
import {
  FaAngleLeft,
  FaAngleRight,
  FaFacebookF,
  FaGlobe,
  FaPlus,
  FaStore,
  FaTag,
  FaTags,
  FaTruckArrowRight,
  FaUserLarge,
  FaUserLock,
} from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { GiCookingPot } from "react-icons/gi";
import { GoCheckCircleFill, GoDotFill } from "react-icons/go";
import { HiXCircle } from "react-icons/hi";
import { IoMdNotifications } from "react-icons/io";
import { IoArrowUpOutline, IoCloseOutline, IoCloudUploadOutline, IoCopy } from "react-icons/io5";
import { LuHistory } from "react-icons/lu";
import { MdChecklist, MdDelete, MdDeleteSweep, MdEdit, MdTimer } from "react-icons/md";

export const iconSize = {
  small: 12,
  base: 16,
  medium: 24,
  large: 90,
  extraLarge: 100,
};

const iconConfig = {
  add: {
    small: <FaPlus size={iconSize.base} />,
    base: <FaPlus size={iconSize.base} />,
    medium: <FaPlus size={iconSize.medium} />,
    large: <FaPlus size={iconSize.large} />,
    extraLarge: <FaPlus size={iconSize.extraLarge} />,
  },
  delete: {
    small: <MdDelete size={iconSize.small} />,
    base: <MdDelete size={iconSize.base} />,
    medium: <MdDelete size={iconSize.medium} />,
    large: <MdDelete size={iconSize.large} />,
    extraLarge: <MdDelete size={iconSize.extraLarge} />,
  },
  deleteAll: {
    small: <MdDeleteSweep size={iconSize.small} />,
    base: <MdDeleteSweep size={iconSize.base} />,
    medium: <MdDeleteSweep size={iconSize.medium} />,
    large: <MdDeleteSweep size={iconSize.large} />,
    extraLarge: <MdDeleteSweep size={iconSize.extraLarge} />,
  },
  edit: {
    small: <MdEdit size={iconSize.small} />,
    base: <MdEdit size={iconSize.base} />,
    medium: <MdEdit size={iconSize.medium} />,
    large: <MdEdit size={iconSize.large} />,
    extraLarge: <MdEdit size={iconSize.extraLarge} />,
  },
  back: {
    small: <FaAngleLeft size={iconSize.small} />,
    base: <FaAngleLeft size={iconSize.base} />,
    medium: <FaAngleLeft size={iconSize.medium} />,
    large: <FaAngleLeft size={iconSize.large} />,
    extraLarge: <FaAngleLeft size={iconSize.extraLarge} />,
  },
  next: {
    small: <FaAngleRight size={iconSize.small} />,
    base: <FaAngleRight size={iconSize.base} />,
    medium: <FaAngleRight size={iconSize.medium} />,
    large: <FaAngleRight size={iconSize.large} />,
    extraLarge: <FaAngleRight size={iconSize.extraLarge} />,
  },
  minus: {
    small: <BiMinus size={iconSize.small} />,
    base: <BiMinus size={iconSize.base} />,
    medium: <BiMinus size={iconSize.medium} />,
    large: <BiMinus size={iconSize.large} />,
    extraLarge: <BiMinus size={iconSize.extraLarge} />,
  },
  downArrow: {
    small: <BiDownArrowAlt size={iconSize.small} />,
    base: <BiDownArrowAlt size={iconSize.base} />,
    medium: <BiDownArrowAlt size={iconSize.medium} />,
    large: <BiDownArrowAlt size={iconSize.large} />,
    extraLarge: <BiDownArrowAlt size={iconSize.extraLarge} />,
  },
  upArrow: {
    small: <IoArrowUpOutline size={iconSize.small} />,
    base: <IoArrowUpOutline size={iconSize.base} />,
    medium: <IoArrowUpOutline size={iconSize.medium} />,
    large: <IoArrowUpOutline size={iconSize.large} />,
    extraLarge: <IoArrowUpOutline size={iconSize.extraLarge} />,
  },
  filter: {
    small: <BiFilter size={iconSize.small} />,
    base: <BiFilter size={iconSize.base} />,
    medium: <BiFilter size={iconSize.medium} />,
    large: <BiFilter size={iconSize.large} />,
    extraLarge: <BiFilter size={iconSize.extraLarge} />,
  },
  dot: {
    small: <GoDotFill size={iconSize.small} />,
    base: <GoDotFill size={iconSize.base} />,
    medium: <GoDotFill size={iconSize.medium} />,
    large: <GoDotFill size={iconSize.large} />,
    extraLarge: <GoDotFill size={iconSize.extraLarge} />,
  },
  threeDots: {
    small: <BiDotsVerticalRounded size={iconSize.small} />,
    base: <BiDotsVerticalRounded size={iconSize.base} />,
    medium: <BiDotsVerticalRounded size={iconSize.medium} />,
    large: <BiDotsVerticalRounded size={iconSize.large} />,
    extraLarge: <BiDotsVerticalRounded size={iconSize.extraLarge} />,
  },
  timer: {
    small: <BiSolidTimer size={iconSize.small} />,
    base: <BiSolidTimer size={iconSize.base} />,
    medium: <BiSolidTimer size={iconSize.medium} />,
    large: <BiSolidTimer size={iconSize.large} />,
    extraLarge: <BiSolidTimer size={iconSize.extraLarge} />,
  },
  phone: {
    small: <BiPhoneCall size={iconSize.small} />,
    base: <BiPhoneCall size={iconSize.base} />,
    medium: <BiPhoneCall size={iconSize.medium} />,
    large: <BiPhoneCall size={iconSize.large} />,
    extraLarge: <BiPhoneCall size={iconSize.extraLarge} />,
  },
  search: {
    small: <BiSearchAlt size={iconSize.small} />,
    base: <BiSearchAlt size={iconSize.base} />,
    medium: <BiSearchAlt size={iconSize.medium} />,
    large: <BiSearchAlt size={iconSize.large} />,
    extraLarge: <BiSearchAlt size={iconSize.extraLarge} />,
  },
  random: {
    small: <BiRepost size={iconSize.small} />,
    base: <BiRepost size={iconSize.base} />,
    medium: <BiRepost size={iconSize.medium} />,
    large: <BiRepost size={iconSize.large} />,
    extraLarge: <BiRepost size={iconSize.extraLarge} />,
  },
  xMark: {
    small: <IoCloseOutline size={iconSize.small} />,
    base: <IoCloseOutline size={iconSize.base} />,
    medium: <IoCloseOutline size={iconSize.medium} />,
    large: <IoCloseOutline size={iconSize.large} />,
    extraLarge: <IoCloseOutline size={iconSize.extraLarge} />,
  },
  uploadFile: {
    small: <IoCloudUploadOutline size={iconSize.small} />,
    base: <IoCloudUploadOutline size={iconSize.base} />,
    medium: <IoCloudUploadOutline size={iconSize.medium} />,
    large: <IoCloudUploadOutline size={iconSize.large} />,
    extraLarge: <IoCloudUploadOutline size={iconSize.extraLarge} />,
  },
  qrCode: {
    small: <BsQrCode size={iconSize.small} />,
    base: <BsQrCode size={iconSize.base} />,
    medium: <BsQrCode size={iconSize.medium} />,
    large: <BsQrCode size={iconSize.large} />,
    extraLarge: <BsQrCode size={iconSize.extraLarge} />,
  },
  check: {
    small: <GoCheckCircleFill size={iconSize.small} />,
    base: <GoCheckCircleFill size={iconSize.base} />,
    medium: <GoCheckCircleFill size={iconSize.medium} />,
    large: <GoCheckCircleFill size={iconSize.large} />,
    extraLarge: <GoCheckCircleFill size={iconSize.extraLarge} />,
  },
  listCheck: {
    small: <MdChecklist size={iconSize.small} />,
    base: <MdChecklist size={iconSize.base} />,
    medium: <MdChecklist size={iconSize.medium} />,
    large: <MdChecklist size={iconSize.large} />,
    extraLarge: <MdChecklist size={iconSize.extraLarge} />,
  },
  xcircle: {
    small: <HiXCircle size={iconSize.small} />,
    base: <HiXCircle size={iconSize.base} />,
    medium: <HiXCircle size={iconSize.medium} />,
    large: <HiXCircle size={iconSize.large} />,
    extraLarge: <HiXCircle size={iconSize.extraLarge} />,
  },
  money: {
    small: <CiMoneyBill size={iconSize.small} />,
    base: <CiMoneyBill size={iconSize.base} />,
    medium: <CiMoneyBill size={iconSize.medium} />,
    large: <CiMoneyBill size={iconSize.large} />,
    extraLarge: <CiMoneyBill size={iconSize.extraLarge} />,
  },
  file: {
    small: <BiFile size={iconSize.small} />,
    base: <BiFile size={iconSize.base} />,
    medium: <BiFile size={iconSize.medium} />,
    large: <BiFile size={iconSize.large} />,
    extraLarge: <BiFile size={iconSize.extraLarge} />,
  },
  user: {
    small: <FaRegUser size={iconSize.small} />,
    base: <FaRegUser size={iconSize.base} />,
    medium: <FaRegUser size={iconSize.medium} />,
    large: <FaRegUser size={iconSize.large} />,
    extraLarge: <FaRegUser size={iconSize.extraLarge} />,
  },
  user2: {
    small: <FaUserLarge size={iconSize.small} />,
    base: <FaUserLarge size={iconSize.base} />,
    medium: <FaUserLarge size={iconSize.medium} />,
    large: <FaUserLarge size={iconSize.large} />,
    extraLarge: <FaUserLarge size={iconSize.extraLarge} />,
  },
  tick: {
    small: <BsClipboard2CheckFill size={iconSize.small} />,
    base: <BsClipboard2CheckFill size={iconSize.base} />,
    medium: <BsClipboard2CheckFill size={iconSize.medium} />,
    large: <BsClipboard2CheckFill size={iconSize.large} />,
    extraLarge: <BsClipboard2CheckFill size={iconSize.extraLarge} />,
  },
  history: {
    small: <LuHistory size={iconSize.small} />,
    base: <LuHistory size={iconSize.base} />,
    medium: <LuHistory size={iconSize.medium} />,
    large: <LuHistory size={iconSize.large} />,
    extraLarge: <LuHistory size={iconSize.extraLarge} />,
  },
  sortUp: {
    small: <FaSortAmountUp size={iconSize.small} />,
    base: <FaSortAmountUp size={iconSize.base} />,
    medium: <FaSortAmountUp size={iconSize.medium} />,
    large: <FaSortAmountUp size={iconSize.large} />,
    extraLarge: <FaSortAmountUp size={iconSize.extraLarge} />,
  },
  sortDown: {
    small: <FaSortAmountDown size={iconSize.small} />,
    base: <FaSortAmountDown size={iconSize.base} />,
    medium: <FaSortAmountDown size={iconSize.medium} />,
    large: <FaSortAmountDown size={iconSize.large} />,
    extraLarge: <FaSortAmountDown size={iconSize.extraLarge} />,
  },
  details: {
    small: <FaList size={iconSize.small} />,
    base: <FaList size={iconSize.base} />,
    medium: <FaList size={iconSize.medium} />,
    large: <FaList size={iconSize.large} />,
    extraLarge: <FaList size={iconSize.extraLarge} />,
  },
  star: {
    small: <FaStar size={iconSize.small} />,
    base: <FaStar size={iconSize.base} />,
    medium: <FaStar size={iconSize.medium} />,
    large: <FaStar size={iconSize.large} />,
    extraLarge: <FaStar size={iconSize.extraLarge} />,
  },
  returnedBack: {
    small: <FaTruckArrowRight className={"-scale-x-100 transform"} size={iconSize.small} />,
    base: <FaTruckArrowRight className={"-scale-x-100 transform"} size={iconSize.base} />,
    medium: <FaTruckArrowRight className={"-scale-x-100 transform"} size={iconSize.medium} />,
    large: <FaTruckArrowRight className={"-scale-x-100 transform"} size={iconSize.large} />,
    extraLarge: <FaTruckArrowRight className={"-scale-x-100 transform"} size={iconSize.extraLarge} />,
  },
  copy: {
    small: <IoCopy size={iconSize.small} />,
    base: <IoCopy size={iconSize.base} />,
    medium: <IoCopy size={iconSize.medium} />,
    large: <IoCopy size={iconSize.large} />,
    extraLarge: <IoCopy size={iconSize.extraLarge} />,
  },
  code: {
    small: <CiBarcode size={iconSize.small} />,
    base: <CiBarcode size={iconSize.base} />,
    medium: <CiBarcode size={iconSize.medium} />,
    large: <CiBarcode size={iconSize.large} />,
    extraLarge: <CiBarcode size={iconSize.extraLarge} />,
  },
  lock: {
    small: <FaUserLock size={iconSize.small} />,
    base: <FaUserLock size={iconSize.base} />,
    medium: <FaUserLock size={iconSize.medium} />,
    large: <FaUserLock size={iconSize.large} />,
    extraLarge: <FaUserLock size={iconSize.extraLarge} />,
  },
  reset: {
    small: <FaUndo size={iconSize.small} />,
    base: <FaUndo size={iconSize.base} />,
    medium: <FaUndo size={iconSize.medium} />,
    large: <FaUndo size={iconSize.large} />,
    extraLarge: <FaUndo size={iconSize.extraLarge} />,
    noti: {
      small: <IoMdNotifications size={iconSize.small} />,
      base: <IoMdNotifications size={iconSize.base} />,
      medium: <IoMdNotifications size={iconSize.medium} />,
      large: <IoMdNotifications size={iconSize.large} />,
      extraLarge: <IoMdNotifications size={iconSize.extraLarge} />,
    },
  },
  google: {
    small: <FaGoogle size={iconSize.small} />,
    base: <FaGoogle size={iconSize.base} />,
    medium: <FaGoogle size={iconSize.medium} />,
    large: <FaGoogle size={iconSize.large} />,
    extraLarge: <FaGoogle size={iconSize.extraLarge} />,
  },
  googleColor: {
    small: <FcGoogle size={iconSize.small} />,
    base: <FcGoogle size={iconSize.base} />,
    medium: <FcGoogle size={iconSize.medium} />,
    large: <FcGoogle size={iconSize.large} />,
    extraLarge: <FcGoogle size={iconSize.extraLarge} />,
  },
  facebook: {
    small: <FaFacebookF size={iconSize.small} />,
    base: <FaFacebookF size={iconSize.base} />,
    medium: <FaFacebookF size={iconSize.medium} />,
    large: <FaFacebookF size={iconSize.large} />,
    extraLarge: <FaFacebookF size={iconSize.extraLarge} />,
  },
  facebookColor: {
    small: <FaFacebookF size={iconSize.small} className={"text-[#0866ff]"} />,
    base: <FaFacebookF size={iconSize.base} className={"text-[#0866ff]"} />,
    medium: <FaFacebookF size={iconSize.medium} className={"text-[#0866ff]"} />,
    large: <FaFacebookF size={iconSize.large} className={"text-[#0866ff]"} />,
    extraLarge: <FaFacebookF size={iconSize.extraLarge} className={"text-[#0866ff]"} />,
  },
  cashStack: {
    small: <BsCashStack size={iconSize.small} />,
    base: <BsCashStack size={iconSize.base} />,
    medium: <BsCashStack size={iconSize.medium} />,
    large: <BsCashStack size={iconSize.large} />,
    extraLarge: <BsCashStack size={iconSize.extraLarge} />,
  },
  soldBag: {
    small: <BsFillHandbagFill size={iconSize.small} />,
    base: <BsFillHandbagFill size={iconSize.base} />,
    medium: <BsFillHandbagFill size={iconSize.medium} />,
    large: <BsFillHandbagFill size={iconSize.large} />,
    extraLarge: <BsFillHandbagFill size={iconSize.extraLarge} />,
  },
  view: {
    small: <BsEyeFill size={iconSize.small} />,
    base: <BsEyeFill size={iconSize.base} />,
    medium: <BsEyeFill size={iconSize.medium} />,
    large: <BsEyeFill size={iconSize.large} />,
    extraLarge: <BsEyeFill size={iconSize.extraLarge} />,
  },
  foodRation: {
    small: <GiCookingPot size={iconSize.small} />,
    base: <GiCookingPot size={iconSize.base} />,
    medium: <GiCookingPot size={iconSize.medium} />,
    large: <GiCookingPot size={iconSize.large} />,
    extraLarge: <GiCookingPot size={iconSize.extraLarge} />,
  },
  cookingTime: {
    small: <MdTimer size={iconSize.small} />,
    base: <MdTimer size={iconSize.base} />,
    medium: <MdTimer size={iconSize.medium} />,
    large: <MdTimer size={iconSize.large} />,
    extraLarge: <MdTimer size={iconSize.extraLarge} />,
  },
  tag: {
    small: <FaTag size={iconSize.small} />,
    base: <FaTag size={iconSize.base} />,
    medium: <FaTag size={iconSize.medium} />,
    large: <FaTag size={iconSize.large} />,
    extraLarge: <FaTag size={iconSize.extraLarge} />,
  },
  tags: {
    small: <FaTags size={iconSize.small} />,
    base: <FaTags size={iconSize.base} />,
    medium: <FaTags size={iconSize.medium} />,
    large: <FaTags size={iconSize.large} />,
    extraLarge: <FaTags size={iconSize.extraLarge} />,
  },
  onlineStore: {
    small: <FaGlobe size={iconSize.small} />,
    base: <FaGlobe size={iconSize.base} />,
    medium: <FaGlobe size={iconSize.medium} />,
    large: <FaGlobe size={iconSize.large} />,
    extraLarge: <FaGlobe size={iconSize.extraLarge} />,
  },
  directStore: {
    small: <FaStore size={iconSize.small} />,
    base: <FaStore size={iconSize.base} />,
    medium: <FaStore size={iconSize.medium} />,
    large: <FaStore size={iconSize.large} />,
    extraLarge: <FaStore size={iconSize.extraLarge} />,
  },
  cake: {
    small: <FaBirthdayCake size={iconSize.small} />,
    base: <FaBirthdayCake size={iconSize.base} />,
    medium: <FaBirthdayCake size={iconSize.medium} />,
    large: <FaBirthdayCake size={iconSize.large} />,
    extraLarge: <FaBirthdayCake size={iconSize.extraLarge} />,
  },
};
export default iconConfig;
