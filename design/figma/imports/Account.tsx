import svgPaths from "./svg-2if4dyr8aa";
import imgImage10 from "figma:asset/043f423a7a7fd2bba4d22c261ab8e012d8f9ee47.png";

function RightSide() {
  return (
    <div className="absolute h-[11.336px] right-[14.67px] top-[17.33px] w-[66.661px]" data-name="Right Side">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 67 12">
        <g id="Right Side">
          <g id="Battery">
            <path d={svgPaths.p21e39200} id="Rectangle" opacity="0.35" stroke="var(--stroke-0, black)" />
            <path d={svgPaths.p3aa28980} fill="var(--fill-0, black)" id="Combined Shape" opacity="0.4" />
            <path d={svgPaths.p5ab6380} fill="var(--fill-0, black)" id="Rectangle_2" />
          </g>
          <path d={svgPaths.p1c908800} fill="var(--fill-0, black)" id="Wifi" />
          <path d={svgPaths.pcce4d00} fill="var(--fill-0, black)" id="Mobile Signal" />
        </g>
      </svg>
    </div>
  );
}

function Time() {
  return (
    <div className="absolute h-[21px] left-[21px] top-3 w-[54px]" data-name="Time">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54 21">
        <g id="Time">
          <g id="9:41">
            <path d={svgPaths.p24372f50} fill="var(--fill-0, black)" />
            <path d={svgPaths.p3aa84e00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p2e6b3780} fill="var(--fill-0, black)" />
            <path d={svgPaths.p12b0b900} fill="var(--fill-0, black)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function LeftSide() {
  return (
    <div className="absolute contents left-[21px] top-3" data-name="Left Side">
      <Time />
    </div>
  );
}

function IPhoneXOrNewer() {
  return (
    <div className="h-11 overflow-clip pointer-events-auto sticky top-0 translate-x-[-50%] w-[375px]" data-name="iPhone X (or newer)">
      <RightSide />
      <LeftSide />
    </div>
  );
}

function Avatar() {
  return (
    <div className="bg-slate-200 overflow-clip relative rounded-[99999px] shrink-0 size-[72px]" data-name="Avatar">
      <div className="absolute aspect-[854/854] bg-center bg-cover bg-no-repeat bottom-[2%] left-1/2 rounded-[9999px] top-[2%] translate-x-[-50%]" data-name="image 10" style={{ backgroundImage: `url('${imgImage10}')` }} />
    </div>
  );
}

function Pencil() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Pencil">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Pencil">
          <path d={svgPaths.p17597d00} fill="var(--fill-0, #020617)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Column() {
  return (
    <div className="box-border content-stretch flex gap-2.5 items-center justify-start p-px relative shrink-0" data-name="Column">
      <Pencil />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex gap-1 items-center justify-start relative shrink-0" data-name="Content">
      <Column />
      <div className="font-['Inter:Bold',_sans-serif] font-bold leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap text-slate-950">
        <p className="leading-[1.4] whitespace-pre">Edit Profile</p>
      </div>
    </div>
  );
}

function ButtonSmall() {
  return (
    <div className="relative rounded-[10px] shrink-0" data-name="Button/Small">
      <div className="box-border content-stretch flex gap-1.5 items-center justify-center overflow-clip p-[10px] relative">
        <Content />
      </div>
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_4px_0px_rgba(202,202,202,0.25)]" />
    </div>
  );
}

function Frame2085663714() {
  return (
    <div className="content-stretch flex flex-col gap-2.5 items-center justify-start relative shrink-0 w-full">
      <div className="font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[0] min-w-full relative shrink-0 text-[24px] text-center text-slate-950 tracking-[-1.2px]" style={{ width: "min-content" }}>
        <p className="leading-[1.15]">Ferran Torres</p>
      </div>
      <ButtonSmall />
    </div>
  );
}

function Frame2085663715() {
  return (
    <div className="content-stretch flex flex-col gap-4 items-center justify-start relative shrink-0 w-[205px]">
      <Avatar />
      <Frame2085663714 />
    </div>
  );
}

function Car() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Car">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Car">
          <path d={svgPaths.p3b0d9a00} fill="var(--fill-0, #454ADE)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Wrapper() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-1.5 grow items-start justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="Wrapper">
      <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold relative shrink-0 text-[16px] text-slate-950 w-full">
        <p className="leading-[1.25]">WV id 3.0</p>
      </div>
      <div className="font-['Inter:Medium',_sans-serif] font-medium relative shrink-0 text-[13px] text-slate-500 w-full">
        <p className="leading-[1.25]">Vehicle</p>
      </div>
    </div>
  );
}

function GeneralList() {
  return (
    <div className="content-stretch flex gap-3 items-start justify-start relative shrink-0 w-full" data-name="General/List">
      <Car />
      <Wrapper />
    </div>
  );
}

function SunHorizon() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SunHorizon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SunHorizon">
          <path d={svgPaths.p1a39c900} fill="var(--fill-0, #454ADE)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Wrapper1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-1.5 grow items-start justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="Wrapper">
      <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold relative shrink-0 text-[16px] text-slate-950 w-full">
        <p className="leading-[1.25]">Solar.One</p>
      </div>
      <div className="font-['Inter:Medium',_sans-serif] font-medium relative shrink-0 text-[13px] text-slate-500 w-full">
        <p className="leading-[1.25]">Solar community</p>
      </div>
    </div>
  );
}

function GeneralList1() {
  return (
    <div className="content-stretch flex gap-3 items-start justify-start relative shrink-0 w-full" data-name="General/List">
      <SunHorizon />
      <Wrapper1 />
    </div>
  );
}

function Lightning() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Lightning">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Lightning">
          <path d={svgPaths.paf182c0} fill="var(--fill-0, #454ADE)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Wrapper2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-1.5 grow items-start justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="Wrapper">
      <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold relative shrink-0 text-[16px] text-slate-950 w-full">
        <p className="leading-[1.25]">47819</p>
      </div>
      <div className="font-['Inter:Medium',_sans-serif] font-medium relative shrink-0 text-[13px] text-slate-500 w-full">
        <p className="leading-[1.25]">Energy community member</p>
      </div>
    </div>
  );
}

function GeneralList2() {
  return (
    <div className="content-stretch flex gap-3 items-start justify-start relative shrink-0 w-full" data-name="General/List">
      <Lightning />
      <Wrapper2 />
    </div>
  );
}

function ChargingStation() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="ChargingStation">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="ChargingStation">
          <path d={svgPaths.p214f080} fill="var(--fill-0, #454ADE)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Wrapper3() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-1.5 grow items-start justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="Wrapper">
      <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold relative shrink-0 text-[16px] text-slate-950 w-full">
        <p className="leading-[1.25]">120</p>
      </div>
      <div className="font-['Inter:Medium',_sans-serif] font-medium relative shrink-0 text-[13px] text-slate-500 w-full">
        <p className="leading-[1.25]">Charger in the community</p>
      </div>
    </div>
  );
}

function GeneralList3() {
  return (
    <div className="content-stretch flex gap-3 items-start justify-start relative shrink-0 w-full" data-name="General/List">
      <ChargingStation />
      <Wrapper3 />
    </div>
  );
}

function Wrapper4() {
  return (
    <div className="content-stretch flex flex-col gap-4 items-start justify-start relative shrink-0 w-[327px]" data-name="Wrapper">
      <GeneralList />
      <GeneralList1 />
      <GeneralList2 />
      <GeneralList3 />
    </div>
  );
}

function Frame2085663723() {
  return (
    <div className="content-stretch flex flex-col gap-6 items-start justify-start relative shrink-0 w-full">
      <div className="font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[0] min-w-full relative shrink-0 text-[#000000] text-[20px] tracking-[-1px]" style={{ width: "min-content" }}>
        <p className="leading-[1.2]">Your Information</p>
      </div>
      <Wrapper4 />
    </div>
  );
}

function Wrapper5() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-1.5 grow items-start justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="Wrapper">
      <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold relative shrink-0 text-[16px] text-slate-950 w-full">
        <p className="leading-[1.25]">Payment</p>
      </div>
      <div className="font-['Inter:Medium',_sans-serif] font-medium relative shrink-0 text-[13px] text-slate-500 w-full">
        <p className="leading-[1.25]">Add or update payment methods</p>
      </div>
    </div>
  );
}

function GeneralList4() {
  return (
    <div className="content-stretch flex gap-3 items-start justify-start relative shrink-0 w-full" data-name="General/List">
      <Wrapper5 />
    </div>
  );
}

function Wrapper6() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-1.5 grow items-start justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="Wrapper">
      <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold relative shrink-0 text-[16px] text-slate-950 w-full">
        <p className="leading-[1.25]">Profile</p>
      </div>
      <div className="font-['Inter:Medium',_sans-serif] font-medium relative shrink-0 text-[13px] text-slate-500 w-full">
        <p className="leading-[1.25]">Customize Name, email, vehicle information</p>
      </div>
    </div>
  );
}

function GeneralList5() {
  return (
    <div className="content-stretch flex gap-3 items-start justify-start relative shrink-0 w-full" data-name="General/List">
      <Wrapper6 />
    </div>
  );
}

function Wrapper7() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-1.5 grow items-start justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="Wrapper">
      <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold relative shrink-0 text-[16px] text-slate-950 w-full">
        <p className="leading-[1.25]">History</p>
      </div>
      <div className="font-['Inter:Medium',_sans-serif] font-medium relative shrink-0 text-[13px] text-slate-500 w-full">
        <p className="leading-[1.25]">See all your charging sessions</p>
      </div>
    </div>
  );
}

function GeneralList6() {
  return (
    <div className="content-stretch flex gap-3 items-start justify-start relative shrink-0 w-full" data-name="General/List">
      <Wrapper7 />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-col gap-5 items-start justify-start relative shrink-0 w-[327px]" data-name="Content">
      <GeneralList4 />
      <GeneralList5 />
      <GeneralList6 />
    </div>
  );
}

function Frame2085663724() {
  return (
    <div className="content-stretch flex flex-col gap-6 items-start justify-start relative shrink-0 w-full">
      <div className="font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[0] min-w-full relative shrink-0 text-[#000000] text-[20px] tracking-[-1px]" style={{ width: "min-content" }}>
        <p className="leading-[1.2]">More Setting</p>
      </div>
      <Content1 />
    </div>
  );
}

function CaretRight() {
  return (
    <div className="relative shrink-0 size-3.5" data-name="CaretRight">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="CaretRight">
          <path d={svgPaths.p24196d00} fill="var(--fill-0, #FFAFAD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame2085663652() {
  return (
    <div className="content-stretch flex gap-3 items-center justify-start relative shrink-0 w-full">
      <div className="basis-0 font-['Inter:Semi_Bold',_sans-serif] font-semibold grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#ff3c38] text-[16px]">
        <p className="leading-[1.25]">Sign out</p>
      </div>
      <CaretRight />
    </div>
  );
}

function Frame2085663725() {
  return (
    <div className="content-stretch flex flex-col gap-6 items-start justify-start relative shrink-0 w-full">
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 327 1">
            <line id="Line 27" stroke="var(--stroke-0, #E2E8F0)" x2="327" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame2085663723 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 327 1">
            <line id="Line 27" stroke="var(--stroke-0, #E2E8F0)" x2="327" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame2085663724 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 327 1">
            <line id="Line 27" stroke="var(--stroke-0, #E2E8F0)" x2="327" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame2085663652 />
    </div>
  );
}

function Frame2085663726() {
  return (
    <div className="absolute content-stretch flex flex-col gap-7 items-center justify-start left-6 top-[68px] w-[327px]">
      <Frame2085663715 />
      <Frame2085663725 />
    </div>
  );
}

function HouseSimple() {
  return (
    <div className="relative shrink-0 size-5" data-name="HouseSimple">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="HouseSimple">
          <path d={svgPaths.p31ac2b00} fill="var(--fill-0, #94A3B8)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function NavbarMenu() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Navbar/Menu">
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1.5 items-center justify-center px-2 py-3 relative w-full">
          <HouseSimple />
          <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap text-slate-400">
            <p className="leading-[1.35] whitespace-pre">Home</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Lightning1() {
  return (
    <div className="relative shrink-0 size-5" data-name="Lightning">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Lightning">
          <path d={svgPaths.pa68d200} fill="var(--fill-0, #94A3B8)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function NavbarMenu1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Navbar/Menu">
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1.5 items-center justify-center px-2 py-3 relative w-full">
          <Lightning1 />
          <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap text-slate-400">
            <p className="leading-[1.35] whitespace-pre">Deals</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapTrifold() {
  return (
    <div className="relative shrink-0 size-5" data-name="MapTrifold">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="MapTrifold">
          <path d={svgPaths.p2a2ba7f0} fill="var(--fill-0, #94A3B8)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function NavbarMenu2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Navbar/Menu">
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1.5 items-center justify-center px-2 py-3 relative w-full">
          <MapTrifold />
          <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap text-slate-400">
            <p className="leading-[1.35] whitespace-pre">Map</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sun() {
  return (
    <div className="relative shrink-0 size-5" data-name="Sun">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Sun">
          <path d={svgPaths.p274b7400} fill="var(--fill-0, #94A3B8)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function NavbarMenu3() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Navbar/Menu">
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1.5 items-center justify-center px-2 py-3 relative w-full">
          <Sun />
          <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap text-slate-400">
            <p className="leading-[1.35] whitespace-pre">Savings</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserCircle() {
  return (
    <div className="relative shrink-0 size-5" data-name="UserCircle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="UserCircle">
          <path d={svgPaths.p336e000} fill="var(--fill-0, #454ADE)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function NavbarMenu4() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Navbar/Menu">
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1.5 items-center justify-center px-2 py-3 relative w-full">
          <UserCircle />
          <div className="font-['Inter:Bold',_sans-serif] font-bold leading-[0] not-italic relative shrink-0 text-[#454ade] text-[12px] text-nowrap">
            <p className="leading-[1.35] whitespace-pre">Account</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cols() {
  return (
    <div className="box-border content-stretch flex h-[66px] items-center justify-start px-3 py-0 relative shrink-0 w-[375px]" data-name="Cols">
      <NavbarMenu />
      <NavbarMenu1 />
      <NavbarMenu2 />
      <NavbarMenu3 />
      <NavbarMenu4 />
    </div>
  );
}

function HomeIndicator() {
  return (
    <div className="h-[34px] relative shrink-0 w-[375px]" data-name="Home Indicator">
      <div className="absolute bg-[#000000] bottom-2 h-[5px] rounded-[100px] translate-x-[-50%] w-[134px]" data-name="Home Indicator" style={{ left: "calc(50% + 0.5px)" }} />
    </div>
  );
}

function NavbarNavbar() {
  return (
    <div className="absolute bg-[#ffffff] bottom-0 left-0 w-[375px]" data-name="Navbar/Navbar">
      <div className="content-stretch flex flex-col items-start justify-start overflow-clip relative w-[375px]">
        <Cols />
        <HomeIndicator />
      </div>
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-slate-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

export default function Account() {
  return (
    <div className="bg-[#ffffff] overflow-clip relative rounded-xl size-full" data-name="Account">
      <div className="absolute h-[532px] left-0 top-0 w-[375px]" data-name="Wrapper">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 375 532">
          <path d="M0 0H375V532H0V0Z" fill="url(#paint0_linear_1_2434)" id="Wrapper" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_2434" x1="187.5" x2="187.5" y1="0" y2="532">
              <stop stopColor="#F5F5F0" />
              <stop offset="1" stopColor="#F5F5F0" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-0 left-1/2 pointer-events-none top-0">
        <IPhoneXOrNewer />
      </div>
      <Frame2085663726 />
      <NavbarNavbar />
    </div>
  );
}