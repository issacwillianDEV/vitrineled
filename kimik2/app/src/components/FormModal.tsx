import { useEffect, useRef, useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FormModal({ isOpen, onClose }: FormModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSubmitted(false);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#05060B]/90 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#A6AFBF] hover:text-[#F2F4F8] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {submitted ? (
          <div className="text-center py-10">
            <CheckCircle className="w-16 h-16 text-[#FF6A3D] mx-auto mb-6" />
            <h3 className="font-display text-2xl font-bold text-[#F2F4F8] mb-4">
              Pré-cadastro enviado!
            </h3>
            <p className="text-[#A6AFBF] mb-6">
              Entraremos em contato em breve para confirmar os próximos passos.
            </p>
            <button onClick={onClose} className="btn-primary">
              Fechar
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-display text-2xl font-bold text-[#F2F4F8] mb-2">
              Pré-cadastro
            </h3>
            <p className="text-[#A6AFBF] mb-6">
              Preencha seus dados e escolha o plano de interesse.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="modal-company" className="text-[#F2F4F8]">Nome da empresa</Label>
                  <Input
                    id="modal-company"
                    placeholder="Sua empresa"
                    required
                    className="bg-[#05060B]/50 border-[#F2F4F8]/10 text-[#F2F4F8] placeholder:text-[#A6AFBF]/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modal-responsible" className="text-[#F2F4F8]">Responsável</Label>
                  <Input
                    id="modal-responsible"
                    placeholder="Nome do responsável"
                    required
                    className="bg-[#05060B]/50 border-[#F2F4F8]/10 text-[#F2F4F8] placeholder:text-[#A6AFBF]/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="modal-whatsapp" className="text-[#F2F4F8]">WhatsApp</Label>
                  <Input
                    id="modal-whatsapp"
                    placeholder="(31) 99999-9999"
                    required
                    className="bg-[#05060B]/50 border-[#F2F4F8]/10 text-[#F2F4F8] placeholder:text-[#A6AFBF]/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modal-email" className="text-[#F2F4F8]">E-mail</Label>
                  <Input
                    id="modal-email"
                    type="email"
                    placeholder="contato@empresa.com"
                    required
                    className="bg-[#05060B]/50 border-[#F2F4F8]/10 text-[#F2F4F8] placeholder:text-[#A6AFBF]/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="modal-segment" className="text-[#F2F4F8]">Segmento</Label>
                  <Input
                    id="modal-segment"
                    placeholder="Ex: Restaurante, Clínica..."
                    required
                    className="bg-[#05060B]/50 border-[#F2F4F8]/10 text-[#F2F4F8] placeholder:text-[#A6AFBF]/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modal-plan" className="text-[#F2F4F8]">Plano de interesse</Label>
                  <Select required>
                    <SelectTrigger className="bg-[#05060B]/50 border-[#F2F4F8]/10 text-[#F2F4F8]">
                      <SelectValue placeholder="Selecione um plano" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0B0E1A] border-[#F2F4F8]/10">
                      <SelectItem value="essential">Visibilidade Essencial</SelectItem>
                      <SelectItem value="strategic">Destaque Estratégico</SelectItem>
                      <SelectItem value="premium">Impacto Premium</SelectItem>
                      <SelectItem value="prime">Núcleo Prime LED</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="modal-notes" className="text-[#F2F4F8]">Observações (opcional)</Label>
                <Textarea
                  id="modal-notes"
                  placeholder="Alguma informação adicional..."
                  className="bg-[#05060B]/50 border-[#F2F4F8]/10 text-[#F2F4F8] placeholder:text-[#A6AFBF]/50 min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="modal-referral" className="text-[#F2F4F8]">Indicação/Consultor (opcional)</Label>
                <Input
                  id="modal-referral"
                  placeholder="Quem indicou?"
                  className="bg-[#05060B]/50 border-[#F2F4F8]/10 text-[#F2F4F8] placeholder:text-[#A6AFBF]/50"
                />
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="modal-lgpd"
                  required
                  className="mt-1 border-[#F2F4F8]/30 data-[state=checked]:bg-[#FF6A3D] data-[state=checked]:border-[#FF6A3D]"
                />
                <Label htmlFor="modal-lgpd" className="text-sm text-[#A6AFBF] leading-relaxed cursor-pointer">
                  Concordo em fornecer meus dados para contato comercial sobre o Vitrine LED Veneza, conforme a LGPD.
                </Label>
              </div>

              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Enviar pré-cadastro
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
