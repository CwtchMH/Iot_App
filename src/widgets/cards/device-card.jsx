import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import {
  useMaterialTailwindController,
  setOpenAC,
  setOpenFan,
  setOpenLight,
} from "@/context";

export function DeviceCard({ color, icon, title, value, footer }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { statusAC, statusFan, statusLight } = controller;
  return (
    <Card
      className="border cursor-pointer border-blue-gray-100 flex flex-col max-h-[155px] items-center shadow-md"
      onClick={() => {
        if (title === "Light") {
          setOpenLight(dispatch, !statusLight);
        } else if (title === "Fan") {
          setOpenFan(dispatch, !statusFan);
        } else {
          setOpenAC(dispatch, !statusAC);
        }
      }}
    >
      <CardHeader
        variant="gradient"
        color={color}
        floated={false}
        shadow={false}
        className="grid h-12 w-12 place-items-center"
      >
        {icon}
      </CardHeader>
      <CardBody className="p-1 text-right">
        <Typography variant="small" className=" text-sm font-normal text-blue-gray-600">
          {title}
        </Typography>
      </CardBody>
      {footer && (
        <CardFooter className="border-t border-blue-gray-50 p-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

DeviceCard.defaultProps = {
  color: "blue",
  footer: null,
};

DeviceCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

DeviceCard.displayName = "/src/widgets/cards/device-card.jsx";

export default DeviceCard;
