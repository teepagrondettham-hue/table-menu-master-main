import padThaiImg from "@/assets/menu-padthai.jpg";
import greenCurryImg from "@/assets/menu-greencurry.jpg";
import tomYumImg from "@/assets/menu-tomyum.png";
import CokeImg from "@/assets/menu-Coke.jpg";
import NumImg from "@/assets/menu-Num.jpg";
import KawpadImg from "@/assets/menu-Kawpad.jpg";
import PopeertodImg from "@/assets/menu-Popeertod.jpg";
import SomtumthaiImg from "@/assets/menu-Somtumthai.jpg";
import LabImg from "@/assets/menu-Lab.jpg";
import YumwoonsenImg from "@/assets/menu-Yumwoonsen.jpg";
import MoojimjawImg from "@/assets/menu-Moojimjaw.jpg";
import PlamuknungmanawImg from "@/assets/menu-Plamuknungmanaw.jpg";
import tomsabImg from "@/assets/menu-tomsab.jpg";
import kaprawImg from "@/assets/menu-kapraw.jpg";
import SomtumlaosImg from "@/assets/menu-Somtumlaos.jpg";
import SomtumKoratImg from "@/assets/menu-SomtumKorat.jpg";
import SomtumluangPrabangImg from "@/assets/menu-SomtumluangPrabang.jpg";
import tumsenlegImg from "@/assets/menu-tumsenleg.jpg";
import tumpuplalaImg from "@/assets/menu-tumpuplala.jpg";
import tumponlamaiImg from "@/assets/menu-tumponlamai.jpg";
import tumgoongsodImg from "@/assets/menu-tumgoongsod.jpg";
import tummooyoImg from "@/assets/menu-tummooyo.jpg";
import tumsuaImg from "@/assets/menu-tumsua.jpg";
import yummooyoImg from "@/assets/menu-yummooyo.jpg";
import yumnamsodImg from "@/assets/menu-yumnamsod.jpg";
import yumgoongsodImg from "@/assets/menu-yumgoongsod.jpg";
import yumtalaImg from "@/assets/menu-yumtala.jpg";
import LabDibImg from "@/assets/menu-LabDib.jpg";
import MoonumtokImg from "@/assets/menu-Moonumtok.jpg";
import tubhwanImg from "@/assets/menu-tubhwan.jpg";
import kaijeawImg from "@/assets/menu-kaijeaw.jpg";
import MookrataemImg from "@/assets/menu-Mookrataem.jpg";
import SukeeImg from "@/assets/menu-Sukee.jpg";
import pudkanaImg from "@/assets/menu-pudkana.jpg";
import kawnalabImg from "@/assets/menu-kawnalab.jpg";
import mukpudpikImg from "@/assets/menu-mukpudpik.jpg";
import pudpedgobImg from "@/assets/menu-pudpedgob.jpg";
import pudpukrwamImg from "@/assets/menu-pudpukrwam.jpg";
import tomjuedImg from "@/assets/menu-tomjued.jpg";
import mamamofaiImg from "@/assets/menu-mamamofai.jpg";
import homokImg from "@/assets/menu-homok.jpg";
import planinImg from "@/assets/menu-planin.jpg";
import planinseeeiwImg from "@/assets/menu-planinseeeiw.jpg";
import plamukluagImg from "@/assets/menu-plamukluag.jpg";
import sailuagImg from "@/assets/menu-sailuag.jpg";
import hoyluagImg from "@/assets/menu-hoyluag.jpg";
import tuatodImg from "@/assets/menu-tuatod.jpg";
import frencfireImg from "@/assets/menu-fencfire.jpg";
import medmamuangtodImg from "@/assets/menu-medmamuangtod.jpg";
import kaimanawImg from "@/assets/menu-kaimanaw.jpg";
import goongmanawImg from "@/assets/menu-goongmanaw.jpg";
import plamanawImg from "@/assets/menu-plamanaw.jpg";
import cheeseballImg from "@/assets/menu-cheeseball.jpg";
import hedtodImg from "@/assets/menu-hedtod.jpg";
import peekkaiImg from "@/assets/menu-peekkai.jpg";
import enkaiImg from "@/assets/menu-enkaitod.jpg";
import nuggetImg from "@/assets/menu-nugget.jpg";
import sodaImg from "@/assets/menu-soda.jpg";
import numdangImg from "@/assets/menu-numdang.png";
import sprieImg from "@/assets/menu-sprie.jpg";
import numkeawImg from "@/assets/menu-numkeaw.png";
import singlemonImg from "@/assets/menu-singlemon.jpg";
import pooatWasabiImg from "@/assets/menu-pooatWasabi.jpg";
import namsomImg from "@/assets/menu-namsom.jpg";
import KungchaenamplaImg from "@/assets/menu-Kungchaenampla.jpg";
import ThuareaYipunImg from "@/assets/menu-thuareayipun.jpg";
import schweppesImg from "@/assets/menu-schweppes.jpg";
import SalmonwasabiImg from "@/assets/menu-Salmonwasabi.jpg";
import KungdongKoreaImg from "@/assets/menu-kungdongkorea.jpg";
import takoImg from "@/assets/menu-tako.jpg";
import NaemsongKhrueangImg from "@/assets/menu-NaemsongKhrueang.jpg";
import PaechaplaninmorfaiImg from "@/assets/menu-Paechaplaninmorfai.jpg";
import plarraadprikImg from "@/assets/menu-plarraadprik.jpg";
import plathotkrathiamImg from "@/assets/menu-plathotkrathiam.jpg";
import plathotnampalImg from "@/assets/menu-plathotnampal.jpg";
import platodsamouthaiImg from "@/assets/menu-platodsamouthai.jpg";
import planinphatkhuenchaiImg from "@/assets/menu-planinphatkhuenchai.jpg";
import phatchaplaKhangImg from "@/assets/menu-phatchaplaKhang.jpg";
import PhatchaplaninImg from "@/assets/menu-Phatchaplanin.jpg";
import plakhangphatkhuenchaiImg from "@/assets/menu-plakhangphatkhuenchai.jpg";

export const menuData = [
  {
    id: "1",
    name: "ผัดไทย",
    description: "เส้นผัดไทย โรยถั่วกรอบ เสิร์ฟพร้อมมะนาว",
    price: 60,
    category: "อาหารจานเดียว",
    image: padThaiImg,
    proteinOptions: [
      { id: "pork", label: "หมู", extraPrice: 0 },
      { id: "chicken", label: "ไก่", extraPrice: 0 },
      { id: "shrimp", label: "กุ้ง", extraPrice: 20 },
      { id: "squid", label: "ปลาหมึก", extraPrice: 20 },
      { id: "mixed_seafood", label: "ทะเลรวม", extraPrice: 40 },
    ],
  },
  {
    id: "2",
    name: "แกงเขียวหวานไก่",
    description: "แกงเขียวหวาน เครื่องแกงสดใหม่ กะทิเข้มข้น",
    price: 120,
    category: "อาหารจานเดียว",
    image: greenCurryImg,
    proteinOptions: [
      { id: "chicken", label: "ไก่", extraPrice: 0 },
      { id: "pork", label: "หมู", extraPrice: 0 },
      { id: "beef", label: "เนื้อ", extraPrice: 30 },
      { id: "shrimp", label: "กุ้ง", extraPrice: 30 },
    ],
  },
  {
    id: "3",
    name: "ต้มยำกุ้ง",
    description: "ต้มยำกุ้ง เลือกน้ำข้นหรือน้ำใส กุ้งสดใหญ่ เครื่องเทศครบ",
    price: 80,
    category: "ต้ม/นึ่ง/ลวกจิ้ม",
    image: tomYumImg,
    hasSoupOption: true,
    sizeOptions: [
      { id: "cup", label: "ถ้วย", price: 80 },
      { id: "pot", label: "หม้อ", price: 180 },
    ],
    proteinOptions: [
      { id: "shrimp", label: "กุ้ง", extraPrice: 0 },
      { id: "mixed_seafood", label: "ทะเลรวม", extraPrice: 40 },
    ],
  },
  {
    id: "5",
    name: "ข้าวผัด",
    description: "ข้าวผัดไข่ รสชาติกลมกล่อม",
    price: 60,
    category: "อาหารจานเดียว",
    image: KawpadImg,
    proteinOptions: [
      { id: "pork", label: "หมู", extraPrice: 0 },
      { id: "chicken", label: "ไก่", extraPrice: 0 },
      { id: "shrimp", label: "กุ้ง", extraPrice: 20 },
      { id: "crab", label: "ปู", extraPrice: 30 },
    ],
  },
  {
    id: "6",
    name: "ปอเปี๊ยะทอด",
    description: "ปอเปี๊ยะทอดกรอบ เสิร์ฟพร้อมน้ำจิ้ม",
    price: 60,
    category: "ของทอด / ของกินเล่น",
    image: PopeertodImg,
  },
  {
    id: "7",
    name: "น้ำโค้ก",
    description: "",
    price: 20,
    category: "เครื่องดื่ม",
    image: CokeImg,
  },
  {
    id: "8",
    name: "น้ำเปล่า",
    description: "",
    price: 20,
    category: "เครื่องดื่ม",
    image: NumImg,
  },
  {
    id: "9",
    name: "ส้มตำไทย",
    description: "เผ็ดน้อย/มาก ใส่/ไม่ใส่ ปูปลาร้า กรุณาระบุหมายเหตุ",
    price: 60,
    category: "ส้มตำ/ยำ/ลาบ",
    image: SomtumthaiImg,
  },
  {
    id: "10",
    name: "ส้มตำซั่ว",
    description: "เผ็ดน้อย/มาก ใส่/ไม่ใส่ ปูปลาร้า กรุณาระบุหมายเหตุ",
    price: 69,
    category: "ส้มตำ/ยำ/ลาบ",
    image: tumsuaImg,
  },
 {
    id: "11",
    name: "ส้มตำหมูยอ",
    description: "เผ็ดน้อย/มาก ใส่/ไม่ใส่ ปูปลาร้า กรุณาระบุหมายเหตุ",
    price: 79,
    category: "ส้มตำ/ยำ/ลาบ",
    image: tummooyoImg,
  },
  {
    id: "12",
    name: "มาม่าทะเลหม้อไฟ",
    description: "ต้มแซ่บรสจัด เลือกน้ำข้นหรือน้ำใส",
    price: 199,
    category: "ต้ม/นึ่ง/ลวกจิ้ม",
    image: mamamofaiImg,
  },
  {
    id: "13",
    name: "ต้มแซ่บ",
    description: "ต้มแซ่บรสจัด เลือกน้ำข้นหรือน้ำใส",
    price: 70,
    category: "ต้ม/นึ่ง/ลวกจิ้ม",
    image: tomsabImg,
    sizeOptions: [
      { id: "cup", label: "ถ้วย", price: 70 },
      { id: "pot", label: "หม้อ", price: 140 },
    ],
    proteinOptions: [
      { id: "pork", label: "หมู", extraPrice: 0 },
      { id: "beef", label: "เนื้อ", extraPrice: 20 },
      { id: "mixed_seafood", label: "ทะเลรวม", extraPrice: 30 },
    ],
  },
    {
    id: "14",
    name: "ต้มจืดเต้าหู้หมูเด้งสาหร่าย",
    description: "ต้มแซ่บรสจัด เลือกน้ำข้นหรือน้ำใส",
    price: 70,
    category: "ต้ม/นึ่ง/ลวกจิ้ม",
    image: tomjuedImg,
    sizeOptions: [
      { id: "cup", label: "ถ้วย", price: 99 },
      { id: "pot", label: "หม้อ", price: 129 },
    ],
  },
  {
    id: "15",
    name: "กะเพรา",
    description: "ผัดกะเพรา ใบกะเพราหอม ๆ พริกสด",
    price: 60,
    category: "อาหารจานเดียว",
    image: kaprawImg,
    proteinOptions: [
      { id: "pork", label: "หมูสับ", extraPrice: 0 },
      { id: "chicken", label: "ไก่สับ", extraPrice: 0 },
      { id: "crispy_pork", label: "หมูกรอบ", extraPrice: 20 },
      { id: "shrimp", label: "กุ้ง", extraPrice: 30 },
      { id: "squid", label: "ปลาหมึก", extraPrice: 30 },
      { id: "mixed_seafood", label: "ทะเลรวม", extraPrice: 50 },
    ],
  },
  {
    id: "16",
    name: "ส้มตำลาว",
    description: "เผ็ดน้อย/มาก ใส่/ไม่ใส่ ปูปลาร้า กรุณาระบุหมายเหตุ",
    price: 59,
    category: "ส้มตำ/ยำ/ลาบ",
    image: SomtumlaosImg,
  },
  {
    id: "17",
    name: "ส้มตำโคราช",
    description: "เผ็ดน้อย/มาก ใส่/ไม่ใส่ ปูปลาร้า กรุณาระบุหมายเหตุ",
    price: 59,
    category: "ส้มตำ/ยำ/ลาบ",
    image: SomtumKoratImg,
  },
  {
    id: "18",
    name: "ส้มตำหลวงพระบาง",
    description: "เผ็ดน้อย/มาก ใส่/ไม่ใส่ ปูปลาร้า กรุณาระบุหมายเหตุ",
    price: 69,
    category: "ส้มตำ/ยำ/ลาบ",
    image: SomtumluangPrabangImg,
  },
  {
    id: "19",
    name: "ส้มตำเส้นเล็ก",
    description: "เผ็ดน้อย/มาก ใส่/ไม่ใส่ ปูปลาร้า กรุณาระบุหมายเหตุ",
    price: 89,
    category: "ส้มตำ/ยำ/ลาบ",
    image: tumsenlegImg,
  },
  {
    id: "20",
    name: "ส้มตำปูปลาร้า",
    description: "เผ็ดน้อย/มาก ใส่/ไม่ใส่ ปูปลาร้า กรุณาระบุหมายเหตุ",
    price: 69,
    category: "ส้มตำ/ยำ/ลาบ",
    image: tumpuplalaImg,
  },
  {
    id: "21",
    name: "ส้มตำผลไม้",
    description: "เผ็ดน้อย/มาก ใส่/ไม่ใส่ ปูปลาร้า กรุณาระบุหมายเหตุ",
    price: 99,
    category: "ส้มตำ/ยำ/ลาบ",
    image: tumponlamaiImg,
  },
   {
    id: "22",
    name: "ส้มตำกุ้งสด",
    description: "เผ็ดน้อย/มาก ใส่/ไม่ใส่ ปูปลาร้า กรุณาระบุหมายเหตุ",
    price: 99,
    category: "ส้มตำ/ยำ/ลาบ",
    image: tumgoongsodImg,
  },
   {
    id: "23",
    name: "ส้มตำหมูยอ",
    description: "เผ็ดน้อย/มาก ใส่/ไม่ใส่ ปูปลาร้า กรุณาระบุหมายเหตุ",
    price: 79,
    category: "ส้มตำ/ยำ/ลาบ",
    image: tummooyoImg,
  },
    {
    id: "24",
    name: "ยำหมูยอ",
    description: "เผ็ดน้อย/มาก กรุณาระบุหมายเหตุ",
    price: 89,
    category: "ส้มตำ/ยำ/ลาบ",
    image: yummooyoImg,
  },
   {
    id: "25",
    name: "ยำวุ้นเส้น",
    description: "เผ็ดน้อย/มาก กรุณาระบุหมายเหตุ",
    price: 70,
    category: "ส้มตำ/ยำ/ลาบ",
    image: YumwoonsenImg,
    proteinOptions: [
      { id: "pork", label: "หมู", extraPrice: 0 },
      { id: "shrimp", label: "กุ้ง", extraPrice: 20 },
      { id: "squid", label: "ปลาหมึก", extraPrice: 20 },
      { id: "mixed_seafood", label: "ทะเลรวม", extraPrice: 30 },
    ],
  },
   {
    id: "26",
    name: "ยำแหนมสด",
    description: "เผ็ดน้อย/มาก กรุณาระบุหมายเหตุ",
    price: 89,
    category: "ส้มตำ/ยำ/ลาบ",
    image: yumnamsodImg,
  },
   {
    id: "27",
    name: "ยำกุ้งสด",
    description: "เผ็ดน้อย/มาก กรุณาระบุหมายเหตุ",
    price: 99,
    category: "ส้มตำ/ยำ/ลาบ",
    image: yumgoongsodImg,
  },
   {
    id: "28",
    name: "ยำรวมทะเล",
    description: "เผ็ดน้อย/มาก กรุณาระบุหมายเหตุ",
    price: 149,
    category: "ส้มตำ/ยำ/ลาบ",
    image: yumtalaImg,
  },
   {
    id: "29",
    name: "ลาบเมืองสุก",
    description: "แซ่บๆร้อนๆ เครื่องเทศหอม",
    price: 80,
    category: "ส้มตำ/ยำ/ลาบ",
    image: LabImg,
   },
  {
    id: "30",
    name: "ลาบอีสาน",
    description: "ลาบสับสดใหม่ เครื่องเทศหอม",
    price: 89,
    category: "ส้มตำ/ยำ/ลาบ",
    image: LabDibImg,
  },
  {
    id: "31",
    name: "หมูน้ำตก",
    description: "้เผ็ดเปรี้ยว ถึงใจ",
    price: 99,
    category: "ส้มตำ/ยำ/ลาบ",
    image: MoonumtokImg,
    
  },
  {
    id: "32",
    name: "ตับหวาน",
    description: "สดใหม่ เครื่องเทศหอม",
    price: 89,
    category: "ส้มตำ/ยำ/ลาบ",
    image: tubhwanImg,
  },
   {
    id: "33",
    name: "ข้าวไข่เจียวหมูสับ",
    description: "ไข่เจียวนุ่มๆร้อนๆ ไม่อมน้ำมัน",
    price: 59,
    category: "อาหารจานเดียว",
    image: kaijeawImg,
    proteinOptions: [
      { id: "sea", label: "ทะเล", extraPrice: 20 },
    ],
  },
  {
    id: "34",
    name: "ข้าวหมูกระเทียม",
    description: "หมูนุ่ม อร่อย ไม่อมน้ำมัน",
    price: 59,
    category: "อาหารจานเดียว",
    image: MookrataemImg,
    proteinOptions: [
      { id: "sea", label: "ทะเล", extraPrice: 20 },
      { id: "egg", label: "เพิ่มไข่ดาว", extraPrice: 15 },
    ],
  },
  {
    id: "35",
    name: "สุกี้",
    description: "น้ำ/แห้ง กรุณาระบุ",
    price: 59,
    category: "อาหารจานเดียว",
    image: SukeeImg,
    proteinOptions: [
      { id: "sea", label: "ทะเล", extraPrice: 20 },
    ],
  },
   {
    id: "36",
    name: "ข้าวคะน้า",
    description: "หมูนุ่ม คะน้ากรอบ",
    price: 59,
    category: "อาหารจานเดียว",
    image: pudkanaImg,
    proteinOptions: [
      { id: "sea", label: "ทะเล", extraPrice: 20 },
    ],
  },
  {
    id: "37",
    name: "ข้าวหน้าลาบเมือง/อีสาน",
    description: "หมูนุ่ม คะน้ากรอบ",
    price: 69,
    category: "อาหารจานเดียว",
    image: kawnalabImg,
    proteinOptions: [
      { id: "sea", label: "ทะเล", extraPrice: 20 },
    ],
  },
  {
    id: "38",
    name: "หมึกผัดพริกเผา",
    description: "เผ็ดแซ่บ หอมเครื่องเทศ",
    price: 129,
    category: "อาหารจานเดียว",
    image: mukpudpikImg,
  },
   {
    id: "39",
    name: "ผัดเผ็ดกบ",
    description: "เผ็ดแซ่บ หอมเครื่องเทศ",
    price: 139,
    category: "อาหารจานเดียว",
    image: pudpedgobImg,
  },
  {
    id: "40",
    name: "ผัดผักรวม",
    description: "ผักนานาชนิดมีความอร่อย",
    price: 79,
    category: "อาหารจานเดียว",
    image: pudpukrwamImg,
    proteinOptions: [
      { id: "pik", label: "หมู", extraPrice: 20 },
      { id: "shrimp", label: "กุ้ง", extraPrice: 50 },
    ],
  },
 {
    id: "41",
    name: "ปลาหมึกนึ่งมะนาว",
    description: "ปลาหมึกสดนึ่ง ราดน้ำมะนาวรสจัด",
    price: 150,
    category: "ต้ม/นึ่ง/ลวกจิ้ม",
    image: PlamuknungmanawImg,
  },
  {
    id: "42",
    name: "ห่อหมกทะเล",
    description: "รวมของทะเลแสนอร่อย",
    price: 199,
    category: "ต้ม/นึ่ง/ลวกจิ้ม",
    image: homokImg,
  },
  {
    id: "43",
    name: "ปลานิลนึ่งมะนาว",
    description: "มาแบบหม้อไฟร้อนๆ แซ่บๆ",
    price: 299,
    category: "เมนูปลา",
    image: planinImg,
  },
  {
    id: "44",
    name: "ปลานิลนึ่งซีอิ๊ว",
    description: "เนื้อปลาหอมนุ่ม",
    price: 299,
    category: "เมนูปลา",
    image: planinseeeiwImg,
  },
   {
    id: "45",
    name: "หมูจิ้มแจ่ว",
    description: "หมูสดลวกจิ้มน้ำจิ้มแจ่ว พร้อมผัก",
    price: 89,
    category: "ต้ม/นึ่ง/ลวกจิ้ม",
    image: MoojimjawImg,
  },
  {
    id: "46",
    name: "ปลาหมึกลวกจิ้ม",
    description: "ปลาหมึกสดลวกจิ้มน้ำจิ้มแซ่บๆ พร้อมผัก",
    price: 139,
    category: "ต้ม/นึ่ง/ลวกจิ้ม",
    image: plamukluagImg,
  },
   {
    id: "47",
    name: "ไส้ตันลวกจิ้ม",
    description: "ไส้ตันลวกจิ้มน้ำจิ้มแซ่บๆ พร้อมผัก",
    price: 89,
    category: "ต้ม/นึ่ง/ลวกจิ้ม",
    image: sailuagImg,
  },
  {
    id: "48",
    name: "ไส้ตันลวกจิ้ม",
    description: "ไส้ตันลวกจิ้มน้ำจิ้มแซ่บๆ พร้อมผัก",
    price: 99,
    category: "ต้ม/นึ่ง/ลวกจิ้ม",
    image: hoyluagImg,
  },
  {
    id: "49",
    name: "ถั่วทอด",
    description: "กับแกล้ม ไว้ทานเล่นๆ",
    price: 59,
    category: "ของทอด / ของกินเล่น",
    image: tuatodImg,
  },
   {
    id: "50",
    name: "เฟรนฟรายส์",
    description: "กับแกล้ม ไว้ทานเล่นๆ",
    price: 69,
    category: "ของทอด / ของกินเล่น",
    image: frencfireImg,
  },
   {
    id: "51",
    name: "เม็ดมะม่วงทอด",
    description: "กับแกล้ม ไว้ทานเล่นๆ",
    price: 89,
    category: "ของทอด / ของกินเล่น",
    image: medmamuangtodImg,
  },
  {
    id: "52",
    name: "ไก่ครีมมะนาว",
    description: "กับแกล้ม ไว้ทานเล่นๆ",
    price: 89,
    category: "ของทอด / ของกินเล่น",
    image: kaimanawImg,
  },
  {
    id: "53",
    name: "กุ้งครีมมะนาว",
    description: "กับแกล้ม ไว้ทานเล่นๆ",
    price: 89,
    category: "ของทอด / ของกินเล่น",
    image: goongmanawImg,
  },
  {
    id: "54",
    name: "ปลาครีมมะนาว",
    description: "กับแกล้ม ไว้ทานเล่นๆ",
    price: 89,
    category: "ของทอด / ของกินเล่น",
    image: plamanawImg,
  },
  {
    id: "55",
    name: "ชีสบอล",
    description: "กับแกล้ม ไว้ทานเล่นๆ",
    price: 119,
    category: "ของทอด / ของกินเล่น",
    image: cheeseballImg,
  },
  {
    id: "56",
    name: "เห็ดทอด",
    description: "กับแกล้ม ไว้ทานเล่นๆ",
    price: 89,
    category: "ของทอด / ของกินเล่น",
    image: hedtodImg,
  },
  {
    id: "57",
    name: "ปีกไก่ทอดน้ำปลา",
    description: "กับแกล้ม ไว้ทานเล่นๆ",
    price: 99,
    category: "ของทอด / ของกินเล่น",
    image: peekkaiImg,
  },
  {
    id: "58",
    name: "เอ็นไก่ทอด",
    description: "กับแกล้ม ไว้ทานเล่นๆ",
    price: 89,
    category: "ของทอด / ของกินเล่น",
    image: enkaiImg,
  },
  {
    id: "59",
    name: "นักเก็ต",
    description: "กับแกล้ม ไว้ทานเล่นๆ",
    price: 99,
    category: "ของทอด / ของกินเล่น",
    image: nuggetImg,
  },
   {
    id: "60",
    name: "โซดา",
    description: "",
    price: 20,
    category: "เครื่องดื่ม",
    image: sodaImg,
  },
   {
    id: "62",
    name: "น้ำแดง",
    description: "",
    price: 20,
    category: "เครื่องดื่ม",
    image: numdangImg,
  },
   {
    id: "63",
    name: "สไปร์ท",
    description: "",
    price: 20,
    category: "เครื่องดื่ม",
    image: sprieImg,
  }, {
    id: "64",
    name: "น้ำส้ม",
    description: "",
    price: 20,
    category: "เครื่องดื่ม",
    image:  namsomImg,
  },
   {
    id: "65",
    name: "น้ำเขียว",
    description: "",
    price: 20,
    category: "เครื่องดื่ม",
    image: numkeawImg,
  },
   {
    id: "66",
    name: "สิงห์เลม่อน",
    description: "",
    price: 25,
    category: "เครื่องดื่ม",
    image: singlemonImg,
  },
   {
    id: "67",
    name: "ชเวป",
    description: "",
    price: 25,
    category: "เครื่องดื่ม",
    image:schweppesImg ,
  },
   {
    id: "68",
    name: "ปูอัดวาซาบิ",
    description: "",
    price: 79,
    category: "อื่นๆ",
    image: pooatWasabiImg,
  },
  {
    id: "69",
    name: "แซลม่อนวาซาบิ",
    description: "",
    price: 179,
    category: "อื่นๆ",
    image: SalmonwasabiImg,
  },
  {
    id: "70",
    name: "กุ้งแช่น้ำปลา",
    description: "",
    price: 99,
    category: "อื่นๆ",
    image: KungchaenamplaImg,
  },
  {
    id: "71",
    name: "ถั่วแระญี่ปุ่น",
    description: "",
    price: 69,
    category: "อื่นๆ",
    image: ThuareaYipunImg,
  },
  {
    id: "72",
    name: "กุ้งดองเกาหลี",
    description: "",
    price: 129,
    category: "อื่นๆ",
    image:KungdongKoreaImg,
  },
  {
    id: "73",
    name: "ทาโกะ",
    description: "",
    price: 110,
    category: "อื่นๆ",
    image: takoImg,
  },
  {
    id: "74",
    name: "แหนมทรงเครื่อง",
    description: "",
    price: 99,
    category: "อื่นๆ",
    image: NaemsongKhrueangImg,
  },
  {
    id: "75",
    name: "แป๊ะซ๊ะปลานิลหม้อไฟ",
    description: "",
    price: 299,
    category: "เมนูปลา",
    image:PaechaplaninmorfaiImg,
  },
   {
    id: "76",
    name: "ปลาราดพริก",
    description: "ที่ร้านใช้ปลานิลนะคะ",
    price: 259,
    category: "เมนูปลา",
    image: plarraadprikImg,
  },
   {
    id: "77",
    name: "ปลาทอดกระเทียม",
    description: "ที่ร้านใช้ปลานิลนะคะ",
    price: 299,
    category: "เมนูปลา",
    image: plathotkrathiamImg,
  },
   {
    id: "78",
    name: "ปลาทอดน้ำปลา",
    description: "ที่ร้านใช้ปลานิลนะคะ",
    price: 299,
    category: "เมนูปลา",
    image: plathotnampalImg,
  },
   {
    id: "79",
    name: "ปลาทอดสมุนไพร",
    description: "ที่ร้านใช้ปลานิลนะคะ",
    price: 299,
    category: "เมนูปลา",
    image: platodsamouthaiImg,
  },
  {
    id: "80",
    name: "ปลานิลผัดคื่นช่าย",
    description: "",
    price: 149,
    category: "เมนูปลา",
    image: planinphatkhuenchaiImg,
  },
  {
    id: "81",
    name: "ปลาคังผัดคื่นช่าย",
    description: "",
    price: 169,
    category: "เมนูปลา",
    image: plakhangphatkhuenchaiImg,
  },
  {
    id: "82",
    name: "ผัดฉ่าปลาคัง",
    description: "",
    price: 169,
    category: "เมนูปลา",
    image: phatchaplaKhangImg,
  },
  {
    id: "83",
    name: "ผัดฉ่าปลานิล",
    description: "",
    price: 149,
    category: "เมนูปลา",
    image: PhatchaplaninImg ,
  },
];
 

export const categories = [
  "อาหารจานเดียว",
  "ส้มตำ/ยำ/ลาบ",
  "ต้ม/นึ่ง/ลวกจิ้ม",
  "ของทอด / ของกินเล่น",
  "เครื่องดื่ม",
  "อื่นๆ",
  "เมนูปลา",
];
