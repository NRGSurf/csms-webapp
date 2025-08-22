import svgPaths from "./svg-70h466bm2p";

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
    <div className="h-11 overflow-clip pointer-events-auto sticky top-0 w-[375px]" data-name="iPhone X (or newer)">
      <RightSide />
      <LeftSide />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute content-stretch flex flex-col gap-2 items-center justify-center leading-[0] left-6 text-center top-[116px] w-[327px]" data-name="Heading">
      <div className="font-['Space_Grotesk:Bold',_sans-serif] font-bold min-w-full relative shrink-0 text-[32px] text-slate-950 tracking-[-1.6px]" style={{ width: "min-content" }}>
        <p className="leading-[1.12]">Sign up</p>
      </div>
      <div className="font-['Inter:Medium',_sans-serif] font-medium not-italic relative shrink-0 text-[14px] text-slate-500 w-[269px]">
        <p className="leading-[1.4]">Hello 👋 ,are you new here? Complete the data below</p>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex gap-3 items-center justify-start relative shrink-0 w-full" data-name="Label">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[14px] text-slate-950 w-[278px]">
        <p className="leading-[1.4]">Full Name</p>
      </div>
    </div>
  );
}

function Column1() {
  return (
    <div className="basis-0 content-stretch flex gap-0.5 grow items-center justify-start min-h-px min-w-px relative shrink-0" data-name="Column">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap text-slate-950">
        <p className="leading-[1.4] whitespace-pre">Ferran torress</p>
      </div>
    </div>
  );
}

function Form() {
  return (
    <div className="bg-[#ffffff] relative rounded-lg shrink-0 w-full" data-name="Form">
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex gap-1.5 items-center justify-start p-[12px] relative w-full">
          <Column1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.08)]" />
    </div>
  );
}

function TextfieldMedium() {
  return (
    <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full" data-name="Textfield/Medium">
      <Label />
      <Form />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex gap-3 items-center justify-start relative shrink-0 w-full" data-name="Label">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[14px] text-slate-950 w-[278px]">
        <p className="leading-[1.4]">Email</p>
      </div>
    </div>
  );
}

function Column3() {
  return (
    <div className="basis-0 content-stretch flex gap-0.5 grow items-center justify-start min-h-px min-w-px relative shrink-0" data-name="Column">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap text-slate-950">
        <p className="leading-[1.4] whitespace-pre">frrran@nrgsurf.com</p>
      </div>
    </div>
  );
}

function Form1() {
  return (
    <div className="bg-[#ffffff] relative rounded-lg shrink-0 w-full" data-name="Form">
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex gap-1.5 items-center justify-start p-[12px] relative w-full">
          <Column3 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.08)]" />
    </div>
  );
}

function TextfieldMedium1() {
  return (
    <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full" data-name="Textfield/Medium">
      <Label1 />
      <Form1 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex gap-3 items-center justify-start relative shrink-0 w-full" data-name="Label">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[14px] text-slate-950 w-[278px]">
        <p className="leading-[1.4]">Password</p>
      </div>
    </div>
  );
}

function Column5() {
  return (
    <div className="basis-0 content-stretch flex gap-0.5 grow items-center justify-start min-h-px min-w-px relative shrink-0" data-name="Column">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap text-slate-950">
        <p className="leading-[1.4] whitespace-pre">•••••••••••</p>
      </div>
    </div>
  );
}

function EyeSlash() {
  return (
    <div className="relative shrink-0 size-4" data-name="EyeSlash">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="EyeSlash">
          <path d={svgPaths.p21177300} fill="var(--fill-0, #64748B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Column6() {
  return (
    <div className="box-border content-stretch flex gap-2.5 items-center justify-start px-[3px] py-0.5 relative shrink-0" data-name="Column">
      <EyeSlash />
    </div>
  );
}

function Form2() {
  return (
    <div className="bg-[#ffffff] relative rounded-lg shrink-0 w-full" data-name="Form">
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex gap-1.5 items-center justify-start p-[12px] relative w-full">
          <Column5 />
          <Column6 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.08)]" />
    </div>
  );
}

function TextfieldMedium2() {
  return (
    <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full" data-name="Textfield/Medium">
      <Label2 />
      <Form2 />
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex gap-3 items-center justify-start relative shrink-0 w-full" data-name="Label">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[14px] text-slate-950 w-[278px]">
        <p className="leading-[1.4]">Confirm Password</p>
      </div>
    </div>
  );
}

function Column8() {
  return (
    <div className="basis-0 content-stretch flex gap-0.5 grow items-center justify-start min-h-px min-w-px relative shrink-0" data-name="Column">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap text-slate-950">
        <p className="leading-[1.4] whitespace-pre">password7721</p>
      </div>
    </div>
  );
}

function Eye() {
  return (
    <div className="relative shrink-0 size-4" data-name="Eye">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Eye">
          <path d={svgPaths.p2a0b6500} fill="var(--fill-0, #64748B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Column9() {
  return (
    <div className="box-border content-stretch flex gap-2.5 items-center justify-start px-[3px] py-0.5 relative shrink-0" data-name="Column">
      <Eye />
    </div>
  );
}

function Form3() {
  return (
    <div className="bg-[#ffffff] relative rounded-lg shrink-0 w-full" data-name="Form">
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex gap-1.5 items-center justify-start p-[12px] relative w-full">
          <Column8 />
          <Column9 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.08)]" />
    </div>
  );
}

function TextfieldMedium3() {
  return (
    <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full" data-name="Textfield/Medium">
      <Label3 />
      <Form3 />
    </div>
  );
}

function FormGroup() {
  return (
    <div className="content-stretch flex flex-col gap-4 items-start justify-start relative shrink-0 w-full" data-name="Form Group">
      <TextfieldMedium />
      <TextfieldMedium1 />
      <TextfieldMedium2 />
      <TextfieldMedium3 />
    </div>
  );
}

function Check() {
  return (
    <div className="relative shrink-0 size-3" data-name="Check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Check">
          <path d={svgPaths.p1fd42d00} fill="var(--fill-0, white)" id="check" />
        </g>
      </svg>
    </div>
  );
}

function ToggleCheckbox() {
  return (
    <div className="bg-[#454ade] relative rounded shrink-0" data-name="Toggle/Checkbox">
      <div className="box-border content-stretch flex gap-2.5 items-center justify-start overflow-clip p-[4px] relative">
        <Check />
      </div>
      <div aria-hidden="true" className="absolute border border-[#6c70e5] border-solid inset-0 pointer-events-none rounded shadow-[0px_1px_1.4px_0.2px_rgba(38,38,38,0.25)]" />
    </div>
  );
}

function Frame2085663695() {
  return (
    <div className="content-stretch flex gap-3 items-start justify-start relative shrink-0 w-full">
      <ToggleCheckbox />
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#000000] text-[13px] w-[295px]">
        <p className="leading-[1.25]">I agree to the Terms and Conditions and Privacy Policy.</p>
      </div>
    </div>
  );
}

function Frame2085663696() {
  return (
    <div className="absolute content-stretch flex flex-col gap-6 items-start justify-start left-6 top-[272px] w-[327px]">
      <FormGroup />
      <Frame2085663695 />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex gap-1 items-center justify-start relative shrink-0" data-name="Content">
      <div className="font-['Inter:Bold',_sans-serif] font-bold leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-nowrap">
        <p className="leading-[1.4] whitespace-pre">SIGN UP</p>
      </div>
    </div>
  );
}

function ButtonLarge() {
  return (
    <div className="bg-[#454ade] min-w-[100px] relative rounded-[10px] shrink-0 w-full" data-name="Button/Large">
      <div className="flex flex-row items-center justify-center min-w-inherit overflow-clip relative size-full">
        <div className="box-border content-stretch flex gap-1.5 items-center justify-center min-w-inherit px-4 py-3.5 relative w-full">
          <Content />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#6c70e5] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_4px_0px_rgba(202,202,202,0.25),0px_192px_77px_0px_rgba(69,74,222,0.01),0px_299px_84px_0px_rgba(69,74,222,0),0px_108px_65px_0px_rgba(69,74,222,0.05),0px_48px_48px_0px_rgba(69,74,222,0.09),0px_12px_26px_0px_rgba(69,74,222,0.1)]" />
    </div>
  );
}

function Frame2085663697() {
  return (
    <div className="content-stretch flex gap-1 items-baseline justify-center leading-[0] not-italic relative shrink-0 text-nowrap w-full">
      <div className="font-['Inter:Medium',_sans-serif] font-medium relative shrink-0 text-[14px] text-slate-500">
        <p className="leading-[1.4] text-nowrap whitespace-pre">Already have an account?</p>
      </div>
      <div className="font-['Inter:Bold',_sans-serif] font-bold relative shrink-0 text-[#454ade] text-[0px]">
        <p className="[text-underline-position:from-font] decoration-solid leading-[1.4] not-italic text-[14px] text-nowrap underline whitespace-pre">Sign in</p>
      </div>
    </div>
  );
}

function ActionButton() {
  return (
    <div className="absolute content-stretch flex flex-col gap-4 items-start justify-center left-6 top-[696px] w-[327px]" data-name="Action Button">
      <ButtonLarge />
      <Frame2085663697 />
    </div>
  );
}

function HomeIndicator() {
  return (
    <div className="absolute bottom-0 h-[34px] left-0 w-[375px]" data-name="Home Indicator">
      <div className="absolute bg-[#000000] bottom-2 h-[5px] rounded-[100px] translate-x-[-50%] w-[134px]" data-name="Home Indicator" style={{ left: "calc(50% + 0.5px)" }} />
    </div>
  );
}

export default function SignUpFilled() {
  return (
    <div className="bg-[#ffffff] overflow-clip relative rounded-xl size-full" data-name="Sign up (FILLED)">
      <div className="absolute bg-gradient-to-b from-[#f5f5f0] h-[280px] left-0 to-[#f5f5f000] top-0 w-[375px]" />
      <div className="absolute bottom-0 left-0 pointer-events-none top-0">
        <IPhoneXOrNewer />
      </div>
      <Heading />
      <Frame2085663696 />
      <ActionButton />
      <HomeIndicator />
    </div>
  );
}