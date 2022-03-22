import {
  Pill,
  Grid,
  Label,
  PILL_BG_COLOR,
  LabelType,
  Switch,
  Button,
  ButtonType,
  ModalForm,
  Snackbar,
} from ".";
import { SessionStatusHistory } from "../Session/SessionStatusHistory.component";
import { ButtonSize } from "./Button.component";
import { AlertPosition } from "./snack-bar/Snack-Bar.component";

export const Wiki = () => {
  const history = [
    { title: "COMING_SOON", date: new Date() },
    { title: "AVAILABLE", date: new Date() },
    { title: "PREPARING", date: new Date() },
    { title: "CHARGING", date: new Date() },
  ];

  const showSnackbar = ()=>{
    Snackbar.show({
      message:'Snackbar successfully shown up with close button at right pls make sure you have all the details',
      position:AlertPosition.TOP,
      duration: 3000,
    })
  };

  const showConfirmModal = ()=>{
    ModalForm.confirm({
      title:'Stop session',
      alertType:2,
    });
  }
  const showModal = ()=>{
    ModalForm.show({
      title:'Session detail',
      small:false,
      body:(<Wiki />)
    });
  }
  return (
    <>
      <div className="block mb-4">
        <div className="inline-block">
          <Label text="Medium" type={LabelType.LABEL_M} />
        </div>
        <div className="inline-block ml-4">
          <Label text="H3" type={LabelType.H3} />
        </div>
        <div className="inline-block ml-4">
          <Label text="H7" type={LabelType.H7} />
        </div>
        <div className="inline-block ml-4">
          <Label text="H5" type={LabelType.H5} />
        </div>
        <div className="inline-block ml-4">
          <Label text="H4" type={LabelType.H4} />
        </div>
        <div className="inline-block ml-4">
          <Label text="Error" type={LabelType.ERROR} />
        </div>
        <div className="inline-block ml-4">
          <Label text="BODY3" type={LabelType.BODY3} />
        </div>
        <div className="inline-block ml-4">
          <Label text="BODY2" type={LabelType.BODY2} />
        </div>
      </div>
      <hr />
      <div className="block mt-4 mb-4">
        <div className="inline-block">
          <Pill label="Available" bgColor={PILL_BG_COLOR.GREEN} />
        </div>
        <div className="inline-block ml-4">
          <Pill label="In Use" bgColor={PILL_BG_COLOR.BLUE} />
        </div>
        <div className="inline-block ml-4">
          <Pill label="Hidden" bgColor={PILL_BG_COLOR.RED} />
        </div>
        <div className="inline-block ml-4">
          <Pill label="UnAvailable" bgColor={PILL_BG_COLOR.GREY} />
        </div>
        <div className="inline-block ml-4">
          <Pill label="Button" isButton bgColor={PILL_BG_COLOR.PURPLE} />
        </div>
      </div>
      <hr />
      <div className="block mt-6 mb-4">
        <Grid
          columns={[
            { key: "id", title: "Charger Name" },
            { key: "location", title: "Location" },
            {
              key: "status",
              title: "Status",
              component: (row: any) => (
                <Pill
                  label={row.status}
                  bgColor={
                    row.status === "Available"
                      ? PILL_BG_COLOR.GREEN
                      : PILL_BG_COLOR.RED
                  }
                />
              ),
            },
          ]}
          data={[
            { id: "AD-01", location: "UAT", status: "Available" },
            { id: "AD-02", location: "DEV", status: "Hidden" },
          ]}
          totalPage={9}
          primaryKey={"id"}
        />
      </div>
      <hr />
      <div className="block mt-6 mb-4">
        <SessionStatusHistory data={history} />
      </div>
      <div className="block mt-6 mb-4">
        <Switch
          enableLabel="Enabled"
          disableLabel="Disabled"
          onChange={(checked: boolean) => console.log("Switch:", checked)}
        />
      </div>
      <hr/>
      <div className="block mt-6 mb-4">
        <input className="cursor-pointer" type="button" onClick={showModal} value="Show Modal"></input>
        <input className="cursor-pointer ml-5" type="button" onClick={showConfirmModal} value="Confirmation Modal"></input>
      </div>
      <hr/>

      <div className="flex felx-row mt-6 mb-4">
        <Button label="Save" onClick={() => console.log("Save clicked")} />
        <Button label="Cancel" type={ButtonType.Cancel} />
        <Button label="Disabled" type={ButtonType.Disabled} />
        <Button label="INFO" type={ButtonType.Info} size={ButtonSize.SMALL} />
        <Button label="Alert" type={ButtonType.Alert} />
      </div>
      <hr/>
      <div className="flex felx-row mt-6">
        <Button
          size={ButtonSize.FULL}
          label="Snackbar"
          onClick={showSnackbar}
          type={ButtonType.Primary}
        />
      </div>
    </>
  );
};
