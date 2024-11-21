import { Card } from "@/components/ui/card";

const ConversationFallback = () => {
   return (
      <Card
         className="hidden md:flex w-full h-full justify-center items-center
    bg-secondary text-secondary-foreground p-2"
      >
         Mulai Percakapan mu dengan pacar mu
      </Card>
   );
};

export default ConversationFallback;
