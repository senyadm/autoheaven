import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { ChevronRight, Siren } from "lucide-react"
import { tipsInfo } from "@/interfaces/tipsInfo";
interface ArticleCardProps{
  tipsInfo: tipsInfo; // Make sure brandInfo is properly imported
}

const ArticleCard = ({tipsInfo}: ArticleCardProps) => {
  const {tipType, title, description, icon} = tipsInfo;
   return (
    <Card className="w-[350px] w-full shadow transform transition-transform duration-300 hover:scale-105">
      <CardHeader>
        <CardDescription className="text-xs text-primary">{tipType}</CardDescription>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-xs text-primary">{description} </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        {icon}
        <Button  >Read more<ChevronRight /></Button>
      </CardFooter>
    </Card>
  )
}

export default ArticleCard