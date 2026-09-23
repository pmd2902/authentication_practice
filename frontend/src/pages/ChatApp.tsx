import Logout from "@/components/auth/Logout";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";

const ChatApp = () => {
  const user = useAuthStore(s => s.user);
  const handleTest = async () => {
    try {
      await api.get('/user/test', { withCredentials: true })
      toast.success('Test success')
    } catch (error) {
      console.log("Error: ", error)
      toast.error('Test failed')
    }
  }
  return (
    <div>
      {user?.username}
      <Logout />
      <Button onClick={handleTest}>test</Button>
    </div>
  )
}

export default ChatApp