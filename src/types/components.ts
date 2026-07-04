// Frontend UI component interfaces
import { LucideIcon } from 'lucide-react';
import { MatchStatus } from '@prisma/client';
export interface ParamMap {
  '/': Record<string, never>;
  '/about': Record<string, never>;
  '/admin': Record<string, never>;
  '/admin/matches': Record<string, never>;
  '/admin/matches/[id]/scores': { id: string };
  '/admin/scoring-rules': Record<string, never>;
  '/admin/settings': Record<string, never>;
  '/admin/tournaments': Record<string, never>;
  '/api/admin/matches': Record<string, never>;
  '/api/admin/matches/[id]': { id: string };
  '/api/admin/matches/[id]/scores': { id: string };
  '/api/admin/scoring-rules': Record<string, never>;
  '/api/admin/scoring-rules/reset': Record<string, never>;
  '/api/admin/settings': Record<string, never>;
  '/api/admin/teams/[id]': { id: string };
  '/api/admin/tournaments': Record<string, never>;
  '/api/admin/tournaments/[id]': { id: string };
  '/api/admin/tournaments/[id]/teams': { id: string };
  '/api/auth/[...nextauth]': { nextauth: string[] };
  '/api/leaderboard': Record<string, never>;
  '/api/register': Record<string, never>;
  '/api/settings': Record<string, never>;
  '/api/teams/[id]/details': { id: string };
  '/api/tournaments': Record<string, never>;
  '/api/tournaments/[id]': { id: string };
  '/api/upload': Record<string, never>;
  '/contact': Record<string, never>;
  '/leaderboard': Record<string, never>;
  '/login': Record<string, never>;
  '/register': Record<string, never>;
  '/rules': Record<string, never>;
  '/schedule': Record<string, never>;
  '/teams': Record<string, never>;
  '/teams/[id]': { id: string };
  '/tournaments': Record<string, never>;
  '/tournaments/[id]': { id: string };
}

export interface LayoutSlotMap {
  '/': never;
  '/admin': never;
}

export interface ScoringRule {
  rank: number;
  placementPoints: number;
}

export interface MainLayoutProps {
  children: React.ReactNode;
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'outline';
  dot?: boolean;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
}

export interface GetPublicMatchesParams {
  date?: string;
}

export interface GetPublicTeamsParams {
  search?: string;
  tournamentId?: string;
  page?: number;
  limit?: number;
}

export interface AdminSidebarProps {
  userName?: string | null;
}

export interface RegistrationChartChartData {
  date: string;
  count: number;
}

export interface SettingsClientProps {
  initialSettings: Record<string, string>;
}

export interface VisitorChartChartData {
  date: string;
  count: number;
}

export interface LogoutButtonProps {
  isCollapsed?: boolean;
}

export interface Tournament {
  id: string;
  name: string;
  bannerUrl: string | null;
  startDate: Date;
  endDate: Date;
  maxSlots: number;
  prizePool: string | null;
  status: string;
  _count: { teams: number };
}

export interface FeaturedTournamentsProps {
  tournaments: Tournament[];
}

export interface StatsProps {
  stats: {
    tournamentsCount: number;
    teamsCount: number;
    playersCount: number;
  };
}

export interface TeamLeaderboard {
  id: string;
  name: string;
  tag: string;
  logoUrl: string | null;
  totalScore: number;
  killPoints: number;
  placementPoints: number;
  wwcdCount: number;
  matchesPlayed: number;
  rank: number;
}

export interface MiniLeaderboardProps {
  data: {
    tournament: { id: string; name: string };
    leaderboard: TeamLeaderboard[];
  } | null;
}

export interface LeaderboardTeam {
  rank: number;
  teamId: string;
  teamName: string;
  tag: string;
  logoUrl: string | null;
  matchesPlayed: number;
  totalKills: number;
  placementPoints: number;
  totalPoints: number;
  wwcd: number;
}

export interface DateFilterProps {
  availableDates: string[];
}

export interface Match {
  id: string;
  scheduledAt: Date;
  group: string;
  map: string;
  status: MatchStatus;
}

export interface MatchCardProps {
  match: Match;
}

export interface Player {
  id: string;
  ign: string;
  inGameId: string;
  isCaptain: boolean;
}

export interface TeamCardProps {
  team: {
    id: string;
    name: string;
    tag: string;
    logo?: string | null;
    tournament?: { name: string } | null;
    players: Player[];
  };
}

export interface TeamsFilterProps {
  tournaments: { id: string; name: string }[];
}

export interface TournamentInfo {
  id: string;
  name: string;
}

export interface MatchFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  tournaments: TournamentInfo[];
  editingMatch?: MatchInfo | null;
}

export interface MatchInfo {
  id: string;
  scheduledAt: string;
  map: string;
  group?: string;
  status: string;
  tournament?: { id: string; name: string };
}

export interface Team {
  id: string;
  name: string;
  tag: string;
  logoUrl: string | null;
}

export interface ExistingScore {
  teamId: string;
  finishPosition: number;
  killPoints: number;
}

export interface ScoreInputClientProps {
  match: {
    id: string;
    map: string;
    group: string;
    scheduledAt: Date;
    tournament: { name: string } | null;
  };
  teams: Team[];
  initialScores: ExistingScore[];
  scoringRules: ScoringRule[];
}
